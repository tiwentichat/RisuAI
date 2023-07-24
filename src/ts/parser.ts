import DOMPurify from 'isomorphic-dompurify';
import showdown from 'showdown';
import { Marked } from 'marked';

import { DataBase, type Database, type character, type groupChat } from './storage/database';
import { getFileSrc } from './storage/globalApi';
import { processScript, processScriptFull } from './process/scripts';
import { get } from 'svelte/store';
import css from '@adobe/css-tools'
import { selectedCharID } from './stores';
import { calcString } from './process/infunctions';
import { findCharacterbyId } from './util';

const convertora = new showdown.Converter({
    simpleLineBreaks: true,
    strikethrough: true,
    tables: true
})

const mconverted = new Marked({
    gfm: true,
    breaks: true,
    silent: true,
    tokenizer: {

    }
})

const safeConvertor = new showdown.Converter({
    simpleLineBreaks: true,
    strikethrough: true,
    tables: true,
    backslashEscapesHTMLTags: true
})



DOMPurify.addHook("uponSanitizeElement", (node: HTMLElement, data) => {
    if (data.tagName === "iframe") {
       const src = node.getAttribute("src") || "";
       if (!src.startsWith("https://www.youtube.com/embed/")) {
          return node.parentNode.removeChild(node);
       }
    }
});

DOMPurify.addHook("uponSanitizeAttribute", (node, data) => {
    if(data.attrName === 'style'){
        data.attrValue = data.attrValue.replace(/(absolute)|(z-index)|(fixed)/g, '')
    }
    if(data.attrName === 'class'){
        data.attrValue = data.attrValue.split(' ').map((v) => {
            return "x-risu-" + v
        }).join(' ')
    }
})

async function parseAdditionalAssets(data:string, char:character, mode:'normal'|'back'){
    const db = get(DataBase)
    const assetWidthString = (db.assetWidth && db.assetWidth !== -1 || db.assetWidth === 0) ? `max-width:${db.assetWidth}rem;` : ''

    if(char.additionalAssets){
        for(const asset of char.additionalAssets){
            const assetPath = await getFileSrc(asset[1])
            data = data.replaceAll(`{{raw::${asset[0]}}}`, assetPath).
                    replaceAll(`{{img::${asset[0]}}}`,`<img src="${assetPath}" alt="${asset[0]}" style="${assetWidthString} "/>`)
                    .replaceAll(`{{video::${asset[0]}}}`,`<video controls autoplay loop><source src="${assetPath}" type="video/mp4"></video>`)
                    .replaceAll(`{{audio::${asset[0]}}}`,`<audio controls autoplay loop><source src="${assetPath}" type="audio/mpeg"></audio>`)
            if(mode === 'back'){
                data = data.replaceAll(`{{bg::${asset[0]}}}`, `<div style="width:100%;height:100%;background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(${assetPath}); background-size: cover;"></div>`)
            }
        }
    }

    return data
}

export async function ParseMarkdown(data:string, char:(character | groupChat) = null, mode:'normal'|'back' = 'normal', chatID=-1) {
    let firstParsed = ''
    const orgDat = data
    if(char && char.type !== 'group'){
        data = await parseAdditionalAssets(data, char, mode)
        firstParsed = data
    }
    if(char){
        data = processScriptFull(char, data, 'editdisplay', chatID).data
    }
    if(firstParsed !== data && char && char.type !== 'group'){
        data = await parseAdditionalAssets(data, char, mode)
    }
    return decodeStyle(DOMPurify.sanitize(mconverted.parse(encodeStyle(data)), {
        ADD_TAGS: ["iframe", "style", "risu-style"],
        ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
        FORBID_ATTR: ["href"]
    }))
}

export function parseMarkdownSafe(data:string) {
    return DOMPurify.sanitize(safeConvertor.makeHtml(data), {
        FORBID_TAGS: ["a", "style"],
        FORBID_ATTR: ["style", "href", "class"]
    })
}


const styleRegex = /\<style\>(.+?)\<\/style\>/gms
function encodeStyle(txt:string){
    return txt.replaceAll(styleRegex, (f, c1) => {
        return "<risu-style>" + Buffer.from(c1).toString('hex') + "</risu-style>"
    })
}
const styleDecodeRegex = /\<risu-style\>(.+?)\<\/risu-style\>/gms

function decodeStyle(text:string){

    return text.replaceAll(styleDecodeRegex, (full, txt:string) => {
        try {
            const ast = css.parse(Buffer.from(txt, 'hex').toString('utf-8'))
            const rules = ast?.stylesheet?.rules
            if(rules){
                for(const rule of rules){
                    if(rule.selectors){
                        for(let i=0;i<rule.selectors.length;i++){
                            let slt:string = rule.selectors[i]
                            let selectors = slt.split(' ').map((v) => {
                                if(v.startsWith('.')){
                                    return ".x-risu-" + v.substring(1)
                                }
                                return v
                            }).join(' ')

                            rule.selectors[i] = ".chattext " + selectors
                        }
                    }
                }
            }
            return `<style>${css.stringify(ast)}</style>`

        } catch (error) {
            return `CSS ERROR: ${error}`;
        }
    })
}

export async function hasher(data:Uint8Array){
    return Buffer.from(await crypto.subtle.digest("SHA-256", data)).toString('hex');
}

export async function convertImage(data:Uint8Array) {
    if(!get(DataBase).imageCompression){
        return data
    }
    const type = checkImageType(data)
    if(type !== 'Unknown' && type !== 'WEBP' && type !== 'AVIF'){
        if(type === 'PNG' && isAPNG(data)){
            return data
        }
        return await resizeAndConvert(data)
    }
    return data
}

async function resizeAndConvert(imageData: Uint8Array): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const base64Image = 'data:image/png;base64,' + Buffer.from(imageData).toString('base64');
        const image = new Image();
        image.onload = () => {
            URL.revokeObjectURL(base64Image);

            // Create a canvas
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (!context) {
                throw new Error('Unable to get 2D context');
            }

            // Compute the new dimensions while maintaining aspect ratio
            let { width, height } = image;
            if (width > 3000 || height > 3000) {
                const aspectRatio = width / height;
                if (width > height) {
                    width = 3000;
                    height = Math.round(width / aspectRatio);
                } else {
                    height = 3000;
                    width = Math.round(height * aspectRatio);
                }
            }

            // Resize and draw the image to the canvas
            canvas.width = width;
            canvas.height = height;
            context.drawImage(image, 0, 0, width, height);

            // Try to convert to WebP
            let base64 = canvas.toDataURL('image/webp', 90);

            // If WebP is not supported, convert to JPEG
            if (base64.indexOf('data:image/webp') != 0) {
                base64 = canvas.toDataURL('image/jpeg', 90);
            }

            // Convert it to Uint8Array
            const array = Buffer.from(base64.split(',')[1], 'base64');
            resolve(array);
        };
        image.src = base64Image;
    });
}

type ImageType = 'JPEG' | 'PNG' | 'GIF' | 'BMP' | 'AVIF' | 'WEBP' | 'Unknown';

function checkImageType(arr:Uint8Array):ImageType {
    const isJPEG = arr[0] === 0xFF && arr[1] === 0xD8 && arr[arr.length-2] === 0xFF && arr[arr.length-1] === 0xD9;
    const isPNG = arr[0] === 0x89 && arr[1] === 0x50 && arr[2] === 0x4E && arr[3] === 0x47 && arr[4] === 0x0D && arr[5] === 0x0A && arr[6] === 0x1A && arr[7] === 0x0A;
    const isGIF = arr[0] === 0x47 && arr[1] === 0x49 && arr[2] === 0x46 && arr[3] === 0x38 && (arr[4] === 0x37 || arr[4] === 0x39) && arr[5] === 0x61;
    const isBMP = arr[0] === 0x42 && arr[1] === 0x4D;
    const isAVIF = arr[4] === 0x66 && arr[5] === 0x74 && arr[6] === 0x79 && arr[7] === 0x70 && arr[8] === 0x61 && arr[9] === 0x76 && arr[10] === 0x69 && arr[11] === 0x66;
    const isWEBP = arr[0] === 0x52 && arr[1] === 0x49 && arr[2] === 0x46 && arr[3] === 0x46 && arr[8] === 0x57 && arr[9] === 0x45 && arr[10] === 0x42 && arr[11] === 0x50;

    if (isJPEG) return "JPEG";
    if (isPNG) return "PNG";
    if (isGIF) return "GIF";
    if (isBMP) return "BMP";
    if (isAVIF) return "AVIF";
    if (isWEBP) return "WEBP";
    return "Unknown";
}

function isAPNG(pngData: Uint8Array): boolean {
    const pngSignature = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];
    const acTL = [0x61, 0x63, 0x54, 0x4C];
  
    if (!pngData.slice(0, pngSignature.length).every((v, i) => v === pngSignature[i])) {
      throw new Error('Invalid PNG data');
    }
  
    for (let i = pngSignature.length; i < pngData.length - 12; i += 4) {
      if (pngData.slice(i + 4, i + 8).every((v, j) => v === acTL[j])) {
        return true;
      }
    }
    return false;
}

function wppParser(data:string){
    const lines = data.split('\n');
    let characterDetails:{[key:string]:string[]} = {};

    lines.forEach(line => {

        // Check for "{" and "}" indicator of object start and end
        if(line.includes('{')) return;
        if(line.includes('}')) return;

        // Extract key and value within brackets
        let keyBracketStartIndex = line.indexOf('(');
        let keyBracketEndIndex = line.indexOf(')');
        
       if(keyBracketStartIndex === -1 || keyBracketEndIndex === -1) 
            throw new Error(`Invalid syntax ${line}`);
        
       let key = line.substring(0, keyBracketStartIndex).trim();

         // Validate Key    
         if(!key) throw new Error(`Missing Key in ${line}`);

      const valueArray=line.substring(keyBracketStartIndex + 1, keyBracketEndIndex)
          .split(',')
          .map(str => str.trim());
      
      // Validate Values
      for(let i=0;i<valueArray.length ;i++){
           if(!valueArray[i])
               throw new Error(`Empty Value in ${line}`);
              
     }
      characterDetails[key] = valueArray;
   });

   return characterDetails;
}


const rgx = /(?:{{|<)(.+?)(?:}}|>)/gm
const matcher = (p1:string,matcherArg:{chatID:number,db:Database,chara:character|string,rmVar:boolean}) => {
    const lowerCased = p1.toLocaleLowerCase()
    const chatID = matcherArg.chatID
    const db = matcherArg.db
    const chara = matcherArg.chara
    switch(lowerCased){
        case 'previous_char_chat':{
            if(chatID !== -1){
                const selchar = db.characters[get(selectedCharID)]
                const chat = selchar.chats[selchar.chatPage]
                let pointer = chatID - 1
                while(pointer >= 0){
                    if(chat.message[pointer].role === 'char'){
                        return chat.message[pointer].data
                    }
                    pointer--
                }
                return selchar.firstMsgIndex === -1 ? selchar.firstMessage : selchar.alternateGreetings[selchar.firstMsgIndex]
            }
            return ''
        }
        case 'previous_user_chat':{
            if(chatID !== -1){
                const selchar = db.characters[get(selectedCharID)]
                const chat = selchar.chats[selchar.chatPage]
                let pointer = chatID - 1
                while(pointer >= 0){
                    if(chat.message[pointer].role === 'user'){
                        return chat.message[pointer].data
                    }
                    pointer--
                }
                return selchar.firstMsgIndex === -1 ? selchar.firstMessage : selchar.alternateGreetings[selchar.firstMsgIndex]
            }
            return ''
        }
        case 'char':
        case 'bot':{
            let selectedChar = get(selectedCharID)
            let currentChar = db.characters[selectedChar]
            if(currentChar.type !== 'group'){
                return currentChar.name
            }
            if(chara){
                if(typeof(chara) === 'string'){
                    return chara
                }
                else{
                    return chara.name
                }
            }
            return currentChar.name
        }
        case 'user':{
            return db.username
        }
        case 'personality':
        case 'char_persona':{
            const argChara = chara
            const achara = (argChara && typeof(argChara) !== 'string') ? argChara : (db.characters[get(selectedCharID)])
            if(achara.type === 'group'){
                return ""
            }
            return achara.personality
        }
        case 'description':
        case 'char_desc':{
            const argChara = chara
            const achara = (argChara && typeof(argChara) !== 'string') ? argChara : (db.characters[get(selectedCharID)])
            if(achara.type === 'group'){
                return ""
            }
            return achara.desc
        }
        case 'scenario':{
            const argChara = chara
            const achara = (argChara && typeof(argChara) !== 'string') ? argChara : (db.characters[get(selectedCharID)])
            if(achara.type === 'group'){
                return ""
            }
            return achara.scenario
        }
        case 'example_dialogue':
        case 'example_message':{
            const argChara = chara
            const achara = (argChara && typeof(argChara) !== 'string') ? argChara : (db.characters[get(selectedCharID)])
            if(achara.type === 'group'){
                return ""
            }
            return achara.exampleMessage
        }
        case 'persona':
        case 'user_persona':{
            return db.personaPrompt
        }
        case 'main_prompt':
        case 'system_prompt':{
            return db.mainPrompt
        }
        case 'lorebook':
        case 'world_info':{
            const argChara = chara
            const achara = (argChara && typeof(argChara) !== 'string') ? argChara : (db.characters[get(selectedCharID)])
            const selchar = db.characters[get(selectedCharID)]
            const chat = selchar.chats[selchar.chatPage]
            const characterLore = (achara.type === 'group') ? [] : (achara.globalLore ?? [])
            const chatLore = chat.localLore ?? []
            const globalLore = db.loreBook[db.loreBookPage]?.data ?? []
            const fullLore = characterLore.concat(chatLore.concat(globalLore))
            return fullLore.map((f) => {
                return JSON.stringify(f)
            }).join("§\n")
        }
        case 'history':
        case 'messages':{
            const selchar = db.characters[get(selectedCharID)]
            const chat = selchar.chats[selchar.chatPage]
            return chat.message.map((f) => {
                return JSON.stringify(f)
            }).join("§\n")
        }
        case 'ujb':
        case 'global_note':
        case 'system_note':{
            return db.globalNote
        }
        case 'chat_index':{
            return chatID.toString() 
        }
        case 'blank':
        case 'none':{
            return ''
        }
    }
    const arra = p1.split("::")
    if(arra.length > 1){
        const v = arra[1]
        switch(arra[0]){
            case 'getvar':{
                const d =getVarChat(chatID)
                return d[v] ?? "[Null]" 
            }
            case 'calc':{
                return calcString(v).toString()
            }
            case 'addvar':
            case 'setvar':{
                if(matcherArg.rmVar){
                    return ''
                }
                break
            }
            case 'button':{
                return `<button style="padding" x-risu-prompt="${arra[2]}">${arra[1]}</button>`
            }
            case 'risu':{
                return `<img src="/logo2.png" style="height:${v || 45}px;width:${v || 45}px" />`
            }
        }
    }
    if(p1.startsWith('random')){
        if(p1.startsWith('random::')){
            const randomIndex = Math.floor(Math.random() * (arra.length - 1)) + 1
            return arra[randomIndex]
        }
        else{
            const arr = p1.split(/\:|\,/g)
            const randomIndex = Math.floor(Math.random() * (arr.length - 1)) + 1
            return arr[randomIndex]
        }
    }
    return null
}

const smMatcher = (p1:string,matcherArg:{db:Database,chara:character|string,rmVar:boolean}) => {
    const lowerCased = p1.toLocaleLowerCase()
    const db = matcherArg.db
    const chara = matcherArg.chara
    switch(lowerCased){
        case 'char':
        case 'bot':{
            let selectedChar = get(selectedCharID)
            let currentChar = db.characters[selectedChar]
            if(currentChar.type !== 'group'){
                return currentChar.name
            }
            if(chara){
                if(typeof(chara) === 'string'){
                    return chara
                }
                else{
                    return chara.name
                }
            }
            return currentChar.name
        }
        case 'user':{
            return db.username
        }
    }
}

export function risuChatParser(da:string, arg:{
    chatID?:number
    db?:Database
    chara?:string|character|groupChat
    rmVar?:boolean
} = {}):string{
    const chatID = arg.chatID ?? -1
    const db = arg.db ?? get(DataBase)
    const aChara = arg.chara
    let chara:character|string = null

    if(aChara){
        if(typeof(aChara) !== 'string' && aChara.type === 'group'){
            const gc = findCharacterbyId(aChara.chats[aChara.chatPage].message.at(-1).saying ?? '')
            if(gc.name !== 'Unknown Character'){
                chara = gc
            }
        }
        else{
            chara = aChara
        }
    }

    
    let pointer = 0;
    let nested:string[] = [""]
    let pf = performance.now()
    let v = new Uint8Array(255)
    const matcherObj = {
        chatID: chatID,
        chara: chara,
        rmVar: arg.rmVar ?? false,
        db: db
    }
    while(pointer < da.length){
        switch(da[pointer]){
            case '{':{
                if(da[pointer + 1] !== '{'){
                    nested[0] += da[pointer]
                    break
                }
                pointer++
                nested.unshift('')
                v[nested.length] = 1
                break
            }
            case '<':{
                nested.unshift('')
                v[nested.length] = 2
                break
            }
            case '}':{
                if(da[pointer + 1] !== '}' || nested.length === 1 || v[nested.length] !== 1){
                    nested[0] += da[pointer]
                    break
                }
                pointer++
                const dat = nested.shift()
                const mc = matcher(dat, matcherObj)
                nested[0] += mc ?? `{{${dat}}}`
                break
            }
            case '>':{
                if(nested.length === 1 || v[nested.length] !== 2){
                    break
                }
                const dat = nested.shift()
                const mc = smMatcher(dat, matcherObj)
                nested[0] += mc ?? `<${dat}>`
                break
            }
            default:{
                nested[0] += da[pointer]
                break
            }
        }
        pointer++
    }
    if(nested.length === 1){
        return nested[0]
    }
    let result = ''
    while(nested.length > 1){
        let dat = (v[nested.length] === 1) ? '{{' : "<"
        dat += nested.shift()
        result = dat + result
    }
    return nested[0] + result
}

function getVarChat(targetIndex = -1){
    const db = get(DataBase)
    const selchar = db.characters[get(selectedCharID)]
    const chat = selchar.chats[selchar.chatPage]
    let i =0;
    if(targetIndex === -1 || targetIndex >= chat.message.length){
        targetIndex = chat.message.length - 1
    }
    let vars:{[key:string]:string} = {}
    let rules:{
        key:string
        rule:string
        arg:string
    }[] = []
    const fm = selchar.firstMsgIndex === -1 ? selchar.firstMessage : selchar.alternateGreetings[selchar.firstMsgIndex]
    const rg = /(\{\{setvar::(.+?)::(.+?)\}\})/gu
    const rg2 = /(\{\{addvar::(.+?)::(.+?)\}\})/gu
    const rg3 = /(\{\{varrule_(.+?)::(.+?)::(.+?)\}\})/gu
    function process(text:string){
        const m = text.matchAll(rg)
        for(const a of m){
            if(a.length === 4){
                vars[a[2]] = a[3]
            }
        }
        const m2 = text.matchAll(rg2)
        for(const a of m2){
            if(a.length === 4){
                vars[a[2]] = (parseInt(vars[a[2]]) + parseInt(a[3])).toString()
            }
        }
        const m3 = text.matchAll(rg3)
        for(const a of m3){
            if(a.length === 5){
                rules.push({
                    key: a[3],
                    rule: a[2],
                    arg: a[4]
                })
            }
        }
    }
    process(fm)
    while( i <= targetIndex ){
        process(chat.message[i].data)
        i += 1
    }

    for(const rule of rules){
        if(vars[rule.key] === undefined){
            continue
        }
        switch(rule.rule){
            case "max":{
                if(parseInt(vars[rule.key]) > parseInt(rule.arg)){
                    vars[rule.key] = rule.arg
                }
                break
            }
            case "min":{
                if(parseInt(vars[rule.key]) < parseInt(rule.arg)){
                    vars[rule.key] = rule.arg
                }
                break
            }
            case 'overflow':{
                const exArg = rule.arg.split(":")
                let rv = parseInt(vars[rule.key])
                const val = parseInt(exArg[0])
                const tg = exArg[1]

                if(isNaN(val) || isNaN(rv)){
                    break
                }

                vars[tg] = (Math.floor(rv / val)).toString()
                vars[rule.key] = (Math.floor(rv % val)).toString()
            }
        }
    }
    return vars
}
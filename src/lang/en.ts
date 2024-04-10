

export const languageEnglish = {
    formating:{
        'main': "Main Prompt",
        'jailbreak': "Jailbreak Prompt",
        'chats': "Past Chats",
        'lorebook': "Lorebook",
        'globalNote': "Global Note",
        'authorNote': "Author's Note",
        'lastChat': "Last Chat",
        "description": "Character Description",
        'personaPrompt':'Persona Prompt',
        'plain': "Plain Prompt",
        'memory': "Supa/HypaMemory",
        'postEverything': "End-Injected Prompts",
    },
    errors:{
        toomuchtoken: 'Error: The minimum required token is greater than the Max Context Size.',
        unknownModel: 'Error: Unknown model selected',
        httpError: 'Error: error in request:',
        noData: 'There is no data in file, or the file is corrupted',
        onlyOneChat: 'There must be least one chat',
        alreadyCharInGroup: "There is already a character with the same name in the group.",
        noUserIcon: "You must set your icon first.",
        emptyText: "Text is empty.",
        wrongPassword: "Wrong Password",
        networkFetch: "This happens when the network is unstable or the server is down.",
        networkFetchWeb: "This can be a CORS error. this only happens when using web version dude to limitations of the browser. try using desktop local version, or other version of RisuAI.",
        networkFetchPlain: "This can be a plain fetch error. try disabling force plain fetch option in settings.",
        requestLogRemoved: "This request log is removed.",
        requestLogRemovedDesc: "This request log removes when client is refreshed or reloaded.",
    },
    showHelp: "Show Help",
    help:{
        model: "Model option is a main model used in chat.",
        submodel: "Auxiliary Model is a model that used in analizing emotion images and auto suggestions and etc. gpt3.5 is recommended.",
        oaiapikey: 'Api key for OpenAI. you can get it in https://platform.openai.com/account/api-keys',
        mainprompt: 'The main prompt option sets the default model behavior.',
        jailbreak: 'The jailbreak prompt option activates when jailbreak toggle is on in character.',
        globalNote: 'a note that strongly effects model behavior, also known as UJB. works in all characters.',
        autoSuggest: 'Prompts used to generate options when automatically suggesting user responses.',
        formatOrder: "formating order of prompt. lower blocks does more effect to the model.",
        forceUrl: "if it is not blank, the request will go to the url that you had inputed.",
        tempature:"lower values make character follow prompts closely, but it will more likely to response like a machine.\nHigher values will result in creative behavior, but the character's response can break down more easily.",
        frequencyPenalty: "Higher values prevent the use of duplicate words in response, but character's response can break down more easily.",
        presensePenalty: "Higher values prevent the use of duplicate words in all context, but character's response can break down more easily.",
        sdProvider: "provider for image generation.",
        msgSound: "Plays *ding* sound when character responses",
        charDesc: "Brief description of the character. this effects characters response.",
        charFirstMessage: "First message of the character. this highly effects characters response.",
        charNote: "a note that strongly effects model behavior. embbedded to current character. also known as UJB.",
        toggleNsfw: "toggles jailbreak prompt on and off.",
        lorebook: "Lorebook is a user-made dictionary for AI. AI only sees it when where is an activation keys in the context.",
        loreName: "name of the lore. it dosen't effects the Ai.",
        loreActivationKey: "If one of the activation key exists in context, the lore will be activated and prompt will go in. seperated by commas.",
        loreorder: "If insert Order is higher, it will effect the model more, and it will more lessly cuted when activated lore are many.",
        bias:"bias is a key-value data which modifies the likelihood of string appearing.\nit can be -100 to 100, higher values will be more likely to appear, and lower values will be more unlikely to appear. \nAdditionaly, if its set to -101, it would work as 'strong ban word' for some models. \nWarning: if the tokenizer is wrong, it not work properly.",
        emotion: "Emotion Images option shows image depending at character's emotion which is analized by character's response. you must input emotion name as words *(like joy, happy, fear and etc.)* .emotion named **neutral** will be default emotion if it exists. must be more then 3 images to work properly.",
        imggen: "After analyzing the chat, apply the prompt to {{slot}}.",
        regexScript: "Regex Script is a custom script that replaces string that matches IN to OUT.\n\nThere four type options."
                + "\n\n- **Modify Input** modifys user's input"
                + "\n\n- **Modify Output** modifys character's output"
                + "\n\n- **Modify Request Data** modifys current chat data when sent."
                + "\n\n- **Modify Display** just modifies the text when shown without modifying chat data."
                + "\n\nIN must be a regex without flags and without slashes in start and end.\n\nOUT is a string which can include replacement patterns. these are the patterns:"
                + "\n\n- $$\n\n    - inserts $"
                + "\n\n- $&\n\n    - inserts the matched substring."
                + "\n\n- $`\n\n    - inserts the portion of the string that precedes the matched substring."
                + "\n\n- $1\n\n    - inserts the first matching group. works with other number like 2, 3..."
                + "\n\n- $(name)\n\n    - inserts the named group"
                + "\n\nIf OUT starts with **@@**, it doesn't replaces the string, but instead does a special effect if matching string founds."
                + "\n\n- @@emo (emotion name)\n\n    - if character is Emotion Images mode, sets (emotion name) as emotion and prevents default.",
        experimental: "This is a experimental feature. it might be unstable.",
        oogaboogaURL: "If your WebUI supports older version of api, your url should look *like https:.../run/textgen*\n\n"
                + "If your WebUI supports newVersion of api, your url should look like *https://.../api/v1/generate* and use the api server as host, and add --api to arguments.",
        exampleMessage: "Example conversations that effects output of the character. it dosen't uses tokens permanently."
                + "\n\nExample format of conversations:"
                + "\n\n```\n<START>\n{{user}}: hi\n{{char}}: hello\n<START>\n{{user}}: hi\nHaruhi: hello\n```"
                + "\n\n```<START>``` Marks the beginning of a new conversation.",
        creatorQuotes: "Note that appearances on top of first message. Used to inform users about this character. It doesn't go into prompt.",
        systemPrompt: "A prompt that replaces main prompt in settings if its not blank.",
        chatNote: "a note that strongly effects model behavior. embbedded to current chat. also known as memory or ujb.",
        personality: "A brief description about character's personality. \n\n**It is not recommended to use this option. Describe it in character description instead.**",
        scenario: "A brief description about character's scenario. \n\n**It is not recommended to use this option. Describe it in character description instead.**",
        utilityBot: "When activated, it ignores main prompt, jailbreak and other prompts. used for bot made for utility, not for roleplay.",
        loreSelective: "If Selective mode is toggled, both Activation Key and Secondary key should have a match to activate the lore.",
        loreRandomActivation: "If Use Probability Condition is abled, if the lore's other conditions are all met, the lore will be activated with a set probability which is set by 'Probability' each time a chat is sent.",
        additionalAssets: "Additional assets to display in your chat. \n\n - use `{{raw::<asset name>}}` to use as path.\n - use `{{img::<asset name>}}` to use as image\n - use `{{video::<asset name>}}` to use as video\n - use `{{audio::<asset name>}}` to use as audio\n    - recommended to put in Background HTML",
        superMemory: "SuperMemory makes your character memorize more by giving summarized data to AI.\n\n"
        + "SuperMemory model is a model that summarizes that text. davinci is recommended, and Auxiliary models are not recommended unless it is an unfiltered model with over 2000 tokens with great summarizing skill.\n\n"
        + "SuperMemory Prompt decides what prompt should be sent to summarize. if you leave it blank, it will use the default prompt. leaving blank is recommended.\n\n"
        + "After it is all setup, you can able it in the setting of a character.",
        replaceGlobalNote: "If its not blank, it replaces current global note to this.",
        backgroundHTML: "A Markdown/HTML Data that would be injected to the background of chat screen.\n\n you can also use additional assets. for example, you can use `{{audio::<asset name}}` for background music."
            + "\n\n Additionaly, you can use these with additional assets:"
            + "\n - `{{bg::<asset name>}}`: inject the background as asset",
        additionalText: "The text that would be added to Character Description only when ai thinks its needed, so you can put long texts here. seperate with double newlines.",
        charjs: "A javascript code that would run with character. for example, you can check `https://github.com/kwaroran/RisuAI/blob/main/src/etc/example-char.js` CURRENTLY NOT RECOMMENDED TO USE DUDE TO SECURITY REASONS. EXPORTING WOULD NOT INCLUDE THIS.",
        romanizer: "Romanizer is a plugin that converts non-roman characters to roman characters to reduce tokens when using non-roman characters while requesting data. this can result diffrent output from the original model. it is not recommended to use this plugin when using roman characters on chat.",
        oaiRandomUser: "If enabled, random uuid would be put on user parameter on request, and would be changed on refresh. this can be used to prevent AI from identifying user.",
        inlayImages: "If enabled, images could be inlayed to the chat and AIs can see it if they support it.",
        metrica: 'Metric Systemizer is a plugin that converts metrics to imperial units when request, and vice versa on output to show user metric system while using imperial for performace. it is not recommended to use this plugin when using imperial units on chat.',
        lorePlus: "LoreBook+ is a experimental feature that uses vectordb instead of just string matching for better bot making experience and better matching performace.",
        topP: "Top P is a probability threshold for nucleus sampling. model considers the results of the tokens with top_p probability mass.",
        openAIFixer: "OpenAI Fixer is a plugin that fixes some of the problems of OpenAI.",
        sayNothing: "If enabled, it will input 'say nothing' when no string inputed.",
        showUnrecommended: "If enabled, it will show unrecommended, deprecated settings. it is NOT RECOMMENDED to use these settings.",
        imageCompression: "If enabled, it will compress images when exporting character. if animated images doesn't works, try disabling this option.",
        useExperimental: "If enabled, it will show some experimental features.",
        forceProxyAsOpenAI: "If enabled, it will force to use OpenAI format when using reverse proxy.",
        forcePlainFetch: "If enabled, it will use browser fetch api instead of native http request. this can cause CORS errors.",
        autoFillRequestURL: "If enabled, it will autofill request url to match the current model.",
        chainOfThought: "If enabled, it will add chain of thought prompt to the prompt.",
        gptVisionQuality: "This option is used to set the quality of the image detection model. the higher the quality, the more accurate the detection, but more tokens are used.",
        genTimes: "This option is used to set the number of responses to generate on support models. other then first response will be act as cached reroll. this can reduce the cost of the model, but it can also increase the cost if you use it without reroll.",
        requestretrys: "This option is used to set the number of request retrys when request fails.",
        emotionPrompt: "This option is used to set the prompt that is used to detect emotion. if it is blank, it will use the default prompt.",
        removePunctuationHypa: "If enabled, it will remove punctuation before executing HypaMemory.",
        additionalParams: "Additional parameters that would be added to the request body. if you want to exclude some parameters, you can put `{{none}}` to the value. if you want to add a header instead of body, you can put `header::` in front of the key like `header::Authorization`. if you want value as json, you can put `json::` in front of the value like `json::{\"key\":\"value\"}`. otherwise, type of the value would be determined automatically.",
        antiClaudeOverload: "If Claude overload happens, RisuAI would try to prevent it by continuing with same prompt, making it less likely to happen. works only for streamed responses. this could not work for non-official api endpoints.",
        triggerScript: "Trigger Script is a custom script that runs when a condition is met. it can be used to modify the chat data, run a command, change variable, and etc. the type depends when it is triggered. it can also be run by buttons, which can be used with {{button::Display::TriggerName}}, or HTML buttons with `risu-trigger=\"<TriggerName>\"` attribute.",
    },
    setup: {
        chooseProvider: "Choose AI Provider",
        openaikey: "OpenAI with API Key (Recommended)",
        openaiProxy: "OpenAI Reverse proxy",
        setupmodelself: "Others / I will setup myself",
        inputApiKey: "Input API Key Here",
        apiKeyhelp: "You can get api key from: ",
        setupSelfHelp: "Setup yourself in settings, after Welcome screen ends.",
        theme: "Select your theme",
        themeDescWifulike: "Not suitable for mobile",
        themeDescWifuCut: "Suitable for mobile",
        themeDescClassic: "Suitable for All devices",
        texttheme: "Select your text color",
        inputName: "Lastly, Input your Nickname.",
        welcome: "Welcome to RisuAI! Here, I will guide you to setup. First, What may I call you?",
        welcome2: "Hello {username}! before we start, I will ask you some questions. You can change these settings later in settings.\n\nFirst select the AI provider.",
        openAIProvider: "OpenAI GPT is a high quality AI model, but it is paid and filtered.",
        openrouterProvider: "Openrouter has a lot of models, some of them unfiltered and some of them free, but it is not as good as OpenAI.",
        hordeProvider: "Horde is a free provider, but the response time is long and the quality is low.",
        setProviderLater: "There are other providers, but you can set it later in settings. select this if you want to set it later.",
        setupOpenAI: "To use OpenAI, you need to get an API key. \n1. go to https://beta.openai.com/ \n2. login with your account \n3. go to https://beta.openai.com/account/api-keys \n4. click 'Create New API Key' and name your key whatever you want. \n5. copy the key in the website.\n6. go back to RisuAI\n7. paste it, and click send button.",
        setupOpenrouter: "To use Openrouter, you need to get an API key. \n1. go to https://openrouter.ai/keys\n2. click 'Create Key'\n3. set key name whatever you want.\n4. copy the key in the website\n5. go back to RisuAI\n6. paste it, and click send button.",
        allDone: "All Done! please wait a moment.",
    },
    confirm: "Confirm",
    goback: "Go Back",
    botSettings:'Bot Settings',
    model: "Model",
    apiKey: 'API Key',
    providerURL: 'Request URL',
    providerJSON: 'Request Body JSON',
    mainPrompt: "Main Prompt",
    jailbreakPrompt: "Jailbreak Prompt",
    globalNote: "Global Note",
    autoSuggest: "Auto Suggest",
    tokens: 'Tokens',
    maxContextSize: 'Max Context Size',
    maxResponseSize: 'Max Response Size',
    temperature: 'Temperature',
    frequencyPenalty: 'Frequency Penalty',
    presensePenalty: 'Presense Penalty',
    advancedSettings: 'Advanced Settings',
    advancedSettingsWarn: "Warn: If you don't know what the option does, don't change it!",
    formatingOrder: "Formating Order",
    authorNote: "Author's Note",
    firstMessage: 'First Message',
    description: 'Description',
    jailbreakToggle: 'Toggle Jailbreak',
    charIcon: "Character Icon",
    characterDisplay: "Character Display",
    viewScreen: 'Additional Character Screen',
    none: "None",
    emotionImage: "Emotion Images",
    noImages: "No Images",
    noBias: "No Bias",
    image: 'Image',
    name: 'Name',
    emotion: "Emotion Name",
    value: "Value",
    reroll: 'Regenerate',
    chatList: 'Chat List',
    removeChat: "Remove this message?",
    loreBook: 'Lorebook',
    character: "Character",
    Chat: "Chat",
    globalLoreInfo: "Character Lorebook applys to all chats in the character.",
    group: "Group",
    groupLoreInfo: "Group Lorebook applys to all chats in the group.",
    localLoreInfo: "Chat Lorebook only applies to the current chat.",
    removeConfirm: "Do you really want to remove: ",
    removeConfirm2: "Do you REALLY want to remove: ",
    exportConfirm: "Do you want to export this?",
    insertOrder: 'Insertion Order',
    activationKeys: 'Activation keys',
    activationKeysInfo: 'Comma seperated',
    prompt: 'Prompt',
    loreBookDepth: "Lorebook Search Depth",
    loreBookToken: "Lorebook Max Tokens",
    removeCharacter: "Remove Character",
    removeGroup: "Remove Group",
    exportCharacter: "Export Character",
    userSetting: "User Settings",
    username:'Your Name',
    userIcon: "Your Icon",
    successExport: "Successfuly exported and downloaded to your download directory",
    successImport: "Successfuly imported",
    importedCharacter: 'Imported Character',
    alwaysActive: "Always Active",
    additionalPrompt: "Additional Prompt",
    descriptionPrefix: "Description Prefix",
    forceReplaceUrl: "Reverse Proxy",
    emotionWarn: "Auxiliary model is used.",
    plugin: "Plugin",
    language: "Language",
    UiLanguage: "UI Language",
    createfromScratch: "Create from Scratch",
    importCharacter: 'Import Character',
    translator: "Translator",
    disabled: "Disabled",
    noPluginSelected: "Model selected as plugin, but no plugin selected.",
    text: "Text",
    UISize: "Chat Text Size",
    newVersion: "Update found, do you want to install?",
    display: "Display & Audio",
    useCustomBackground: "Custom Background",
    translateInput: "Translate Input",
    autoTranslation: "Auto Translation",
    fullscreen: "Fullscreen",
    playMessage:"Play Message Audio",
    iconSize: "Icon Size",
    createGroup: "Create Group Chat",
    groupIcon: "Group Icon",
    single: "Single",
    multiple: "Multiple",
    useCharLorebook: "Use Lores in Characters",
    selectChar: "Select Character",
    askLoadFirstMsg: "Shall we load the first message?",
    theme: "Theme",
    editOrder: "Edit Order",
    autoMode: "Auto Mode",
    submodel: "Auxiliary Model",
    timeOutinSec: "Timeout (in seconds)",
    emotionPrompt: "Emotion Prompt",
    singleView: "Single View",
    SpacedView: "Multiple Character View",
    emphasizedView: "Double Character View",
    pluginWarn: "Plugins run in an isolated environment, but installing malicious plugins can cause problems.",
    createGroupImg: "Generate group icon",
    waifuWidth: "Waifu Chat Width",
    savebackup: "Save Backup to google",
    loadbackup: "Load Backup from google",
    files: "Files",
    backupConfirm: "Do you really want to save backup?",
    backupLoadConfirm: "Do you really want to load backup? All datas will be lost!",
    backupLoadConfirm2: "Do you really, really want to load backup? All datas will be lost!",
    pasteAuthCode: "Please copy the auth code from popup and paste it in here:",
    others: "Others",
    presets: "Presets",
    imageGeneration: "Image Generation",
    provider: "Provider",
    key: "key",
    noData: "No Data",
    currentImageGeneration: "Current Image Generation Data",
    promptPreprocess: "Use Prompt Preprocess",
    SwipeRegenerate: "Use Swipe for Regeneration",
    instantRemove: "Remove subsequent when message remove",
    instantRemoveConfirm: "Do you want to remove just one message? If you select No, then the message after it will also be remove.",
    textColor: "Text Color",
    classicRisu: "Classic Risu",
    highcontrast: "High-Contrast",
    quickPreset: "You can quickly change preset by Ctrl + (Index of Preset)",
    requestretrys:"Request Retrys when Fail",
    utilityBot: "Utility Bot",
    ShowLog: "Show Request Logs",
    waifuWidth2: "Waifu Character Size",
    sayNothing:"Input 'say nothing' when no string inputed",
    regexScript: "Regex Script",
    type: "Type",
    editInput: "Modify Input",
    editOutput: "Modify Output",
    editProcess: "Modify Request Data",
    loadLatest: "Load Latest Backup",
    loadOthers: "Load Other Backups",
    exampleMessage: "Example Message",
    creatorNotes: "Creator's Comment",
    systemPrompt: "System Prompt",
    characterNotes: "Character Notes",
    personality: "Personality",
    scenario: "Scenario",
    alternateGreetings: "Alternate Greetings",
    unrecommended: "Not Recommended",
    chatNotes: "Chat Notes",
    showUnrecommended: "Show Unrecommended Settings",
    altGreet: "Alternative First Messages",
    scripts: "Scripts",
    settings: "Settings",
    selective: "Selective",
    SecondaryKeys: 'Secondary keys',
    useGlobalSettings: "Use Global Settings",
    recursiveScanning: "Recursive Scanning",
    creator: "Creator",
    CharVersion: "Character Version",
    Speech: "Speech",
    ToggleSuperMemory: "Toggle SupaMemory",
    SuperMemory:"SupaMemory",
    useExperimental: "Able Experimental Features",
    showMemoryLimit: "Show Memory Limit",
    roundIcons: "Round Icons",
    streaming: "Streaming",
    chatBot:'Chat Bot',
    otherBots:'Other Bots',
    user:"User",
    additionalAssets:"Additional Assets",
    editDisplay: "Modify Display",
    community: "Community",
    textBackgrounds: "Custom Text Screen Color",
    textBorder: "Text Outlines",
    textScreenRound: "Round Text Screen",
    textScreenBorder: "Text Screen Borders",
    ttsReadOnlyQuoted: "Read Only Quoted",
    ttsStop: "Stop TTS",
    askRemoval:"Ask Removal",
    replaceGlobalNote: "Global Note Replacement",
    charLoreBook: 'Character Lorebook',
    globalLoreBook: 'Global Lorebook',
    globalRegexScript: "Global Regex",
    accessibility: "Accessibility",
    sendWithEnter: "Send with Enter Key",
    clickToEdit: "Click Text to Edit",
    setNodePassword: "Set your password to security",
    inputNodePassword: "Input your password. if you can't remember, remove save/__password.txt in your server files and restart the server.",
    simple:"Simple",
    advanced: "Advanced",
    askReRollAutoSuggestions: "Re-Roll Auto Suggestions",
    creatingSuggestions: "Creating Suggestions...",
    orderByOrder: "Talk by Order",
    removeFromGroup: "Do you really want to remove {{char}} from group?",
    talkness: "Talkativeness",
    active: "Active",
    loreRandomActivation: "Use Probability Condition",
    activationProbability: "Probability",
    shareCloud: "Share to RisuRealm",
    hub: "RisuRealm",
    tags: "Tags",
    backgroundHTML: "Background Embedding",
    copied: "Copied",
    useChatCopy: "Use Chat Message Copy",
    useChatSticker: "Use Chat Sticker",
    useAdditionalAssetsPreview: "Use Additional Assets Preview",
    autoTranslateInput: "Auto Translate Input",
    enterMessageForTranslateToEnglish: "Enter Message for Translate to English",
    recent: 'Recent',
    downloads: 'Downloads',
    trending: "Trending",
    imageCompression: "Image Compression",
    notLoggedIn: "Not Logged in to Risu Account",
    googleDriveInfo: "Connect to google drive to sync your data.",
    googleDriveConnection: "Google Drive Connection",
    googleDriveConnected: "Google Drive Connected",
    SaveDataInAccount: "Save Data in Account",
    dataSavingInAccount: "Saving Data in Account",
    logout: "Logout",
    loadDataFromAccount: "Load Data from Account",
    saveCurrentDataToAccount: "Save Current Data to Account",
    chatAssumed: "",
    proxyAPIKey: "Proxy Key/Password",
    proxyRequestModel: "Request Model",
    officialWiki: "Official Wiki",
    officialWikiDesc: "Official Wiki for RisuAI. feel free to see.",
    officialDiscord: "Official Discord",
    officialDiscordDesc: "Official Discord to talk about RisuAI",
    confirmRecommendedPreset: "There is a recommended settings for this model. do you want to change the settings to that? (you can turn off asking in the accessiblity settings)",
    toggleConfirmRecommendedPreset: "Ask for recommended setting when model change",
    recommendedPreset: "Set to Recommended Settings",
    persona: "Persona",
    icon:"Icon",
    account: "Account",
    remove: "Remove",
    creationSuccess: "Creation Success",
    noweb: "This feature cannot be used on web version.",
    createBotInternet: "Create Bot from Internet with AI",
    createBotInternetAlert: "Please provide the character's name and the corresponding series/game.",
    able:"Able",
    assetWidth: "Asset Images Max Width",
    animationSpeed: "Animation Speed",
    screenshot: "Screenshot",
    screenshotSaved: "Screenshot Saved",
    inputBotGenerationPrompt: "Input Bot Generation Prompt",
    createBotAI: "Create OC Bot from AI",
    createBotwithAI: "Create Bot from AI",
    changeFolderName: "Input the new folder name (blank to cancel)",
    cancel: "Cancel",
    renameFolder: "Rename Folder",
    changeFolderColor: "Change Folder Color",
    fullWordMatching: "Full Word Matching",
    botSettingAtStart: "Bot Menu when Launch",
    triggerStart: "On chat Send",
    triggerInput: "On user's output",
    triggerOutput: "On character's output",
    triggerManual: "Manual trigger only",
    triggerCondVar: "If Variable",
    triggerCondExists: "If Text Exists on Chat",
    triggerScript: "Trigger Script",
    triggerMatchRegex: "Match with Regex",
    triggerMatchLoose: "Match Loosely",
    triggerMatchStrict: "Match Strictly",
    searchDepth: "Search Depth",
    equal: "Equal to",
    notEqual: "Not Equal to",
    greater: "Greater than",
    less: "Less than",
    greaterEqual: "Greater or Equal to",
    lessEqual: "Less or Equal to",
    triggerEffSysPrompt: 'Add System Prompt',
    triggerEffSetVar: 'Modify Variable',
    triggerEffImperson: 'Send Chat',
    triggerEffCommand: 'Run Command',
    triggerEffRunTrigger: 'Run Trigger',
    triggerEffStop: 'Stop Sending Prompt',
    triggerEffCall: 'Call Trigger',
    varableName: "Variable Name",
    role: "Role",
    location: 'Location',
    promptstart: "Start of Prompt",
    promptend: "End of Prompt",
    historyend: "End of History",
    always: "Always",
    noEffect: "No Effect",
    invaildTriggerEffect: "This effect doesn't works for this trigger type.",
    operator: "Operator",
    TriggerSetToVar: "Set to Variable",
    TriggerAddToVar: "Add to Variable",
    TriggerSubToVar: "Subtract from Variable",
    TriggerMulToVar: "Multiply to Variable",
    TriggerDivToVar: "Divide from Variable",
    isNull: "is not set",
    ifChatIndex: "If chat index",
    ifRandom: "If random",
    ifValue: "If Value",
    hideRealm: "Hide RisuRealm",
    popularityLevel: "{} Popularity",
    colorScheme: "Color Scheme",
    rangeStart: "Range Start",
    rangeEnd: "Range End",
    untilChatEnd: "Until Chat End",
    usePromptTemplate: "Use Prompt Template",
    specialType: "Special Type",
    noSpecialType: "No Special Type",
    forceProxyAsOpenAI: "Force Proxy Format as OpenAI",
    promptTemplate: "Prompt Template",
    customInnerFormat: "Custom Inner Format",
    innerFormat: "Inner Format",
    HypaMemory: "HypaMemory",
    ToggleHypaMemory: "Toggle HypaMemory",
    resetPromptTemplateConfirm: "Do you really want to reset prompt template?",
    emotionMethod: "Emotion Method",
    continueResponse: "Continue Response",
    showMenuChatList: "Show Menu Chat List",
    translatorLanguage: "Translator Language",
    translatorType: "Translator Type",
    deeplKey: "deepL API Key",
    deeplFreeKey: "deepL Free API Key",
    deeplXUrl: "deepLX URL",
    deeplXToken: "deepLX Token",
    exportPersona: "Export Persona",
    importPersona: "Import Persona",
    export: "Export",
    import: "Import",
    supporterThanks: "Supporter Thanks",
    supporterThanksDesc: "Thank you for your support!",
    donatorPatreonDesc:"For default, it will not be shown in the list for privacy. if you want to show your nickname, go to RisuAI's patreon page and press the link button.",
    useNamePrefix: "Use Name Prefix",
    textAdventureNAI: "Run as Text Adventure",
    appendNameNAI: "Append Name on NAI",
    customStopWords: "Custom Stop Words",
    defaultPrompt: "Default Prompt",
    additionalText: 'Additional Description',
    seed: "Seed",
    charjs: "CharacterJS",
    depthPrompt: "Depth Prompt",
    largePortrait: "Portrait",
    lorePlus: "LoreBook+",
    reverseProxyOobaMode: "Ooba Mode",
    joinMultiUserRoom: "Join MultiUser Room",
    exactTokens: "Exact Tokens",
    fixedTokens: "Approximate Tokens",
    inlayViewScreen: "Inlay Screen",
    imgGenPrompt: "Image Generation Prompt",
    imgGenNegatives: "Image Generation Negative Prompt",
    imgGenInstructions: "Image Generation Instructions",
    usePlainFetchWarn: "Please disable this option when using NovelAI, as it can cause CORS errors when using NovelAI.",
    translationPrompt: "Translation Prompt",
    webdeeplwarn: "This option is not recommended for use with web version, as it can cause CORS errors.",
    saveBackupLocal: "Save Backup Locally",
    loadBackupLocal: "Load Backup Locally",
    topP: "Top P",
    genTimes: "Generation Choices",
    cot: "Chain of Thoughts",
    forcePlainFetch: "Force Plain Fetch",
    autoFillRequestURL: "Autofill Request URL",
    newOAIHandle: "New OpenAI Handling",
    oaiRandomUser: "Put OAI Random User",
    inlayImage: "Inlay Image Feature",
    nativeAutomark: "Experimental Native Automark",
    assistantPrefill: "Assistant Prefill",
    postEndInnerFormat: "Post End",
    sendChatAsSystem: "Send Chat as System",
    sendName: "Send Name on Non-group Chat",
    utilOverride: "Utility Override",
    template: "Template",
    chatAsOriginalOnSystem: "Send as original role",
    exportAsDataset: "Export Save as Dataset",
    editTranslationDisplay: "Edit Translation Display",
    selectModel: "Select Model",
    autoRemoveThoughtTag: "Remove Thought Tag",
    customChainOfThought: "Custom Chain of Thoughts",
    maxThoughtTagDepth: "Max Thought Tag Depth",
    openrouterFallback: "Openrouter Fallback",
    openrouterMiddleOut: "Openrouter Middle Out",
    geminiApiKey: "Gemini API Key",
    removePunctuationHypa: "Memory Punctuation Removal",
    memoryLimitThickness: "Memory Limit Thickness",
    inputCardPassword: "Input Card Password",
    ccv2Desc: 'Character Card V2 is is a format widely used in chatbot programs.',
    rccDesc: 'Risu Refined Character Card is a format with additional features like password, integrity check and etc.',
    password: "Password",
    license: "License",
    licenseDesc: "You can choose license for the downloaders to limit the usages of your card's prompt.",
    passwordDesc: "You can set a password to protect your card from unauthorized access.",
    largePersonaPortrait: "Persona Portrait",
    module: "Module",
    modules: "Modules",
    noModules: "No modules has been installed.",
    createModule: "Create Module",
    basicInfo: "Basic Info",
    moduleContent: "Module Content",
    confirmRemoveModuleFeature: "Do you really want to remove this feature? This action cannot be undone.",
    editModule: "Edit Module",
    importModule: "Import Module",
    download: "Download",
    edit: "Edit",
    enableGlobal: "Enable Globally",
    chatModulesInfo: "You can enable or disable modules for this chat.",
    sideMenuRerollButton: "Side Menu Reroll Button",
    persistentStorage: "Persistent Storage",
    persistentStorageSuccess: "Storage is successfully persisted",
    persistentStorageFail: "Storage is not persisted. Did you deny the request?, or is the browser not supported?",
    persistentStorageRecommended: "Persistent Storage Recommended",
    persistentStorageDesc: "Your browser supports persistent storage. this is recommended for better performance and user experience.",
    enable: "Enable",
    postFile: "Post File",
    requestInfoInsideChat: "Show Request Info Inside Chat",
    inputTokens: "Input Tokens",
    outputTokens: "Output Tokens",
    tokenWarning: "Token caculation can be inaccurate. it is recommended to use it as a reference.",
    log: "Log",
    popularityLevelDesc: "Popularity increases with downloads, etc. to estimate, 3.7 popularity is about 1 downloads.",
    additionalParams: "Additional Parameters",
    heightMode: "Height Mode",
    useAdvancedEditor: "Use Advanced Editor",
    noWaitForTranslate: "No Wait for Translate",
    updateRealm: "Update to RisuRealm",
    updateRealmDesc: "You are trying to update your character to RisuRealm. this will update your character to RisuRealm, and you can't revert it back.",
    antiClaudeOverload: "Anti-Claude Overload",
    activeTabChange: "Current tab is inactivated since other tab is active. to activate this tab, click OK",
    maxSupaChunkSize: "Max SupaMemory Chunk Size",
    addCharacter: "Add Character",
    importFromRealm: "Choose from RisuRealm",
    importFromRealmDesc: "Choose over 1000 characters in RisuRealm",
}
const languages = [
  { code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
  { code: 'sq', name: 'Albanian', flag: '🇦🇱' },
  { code: 'am', name: 'Amharic', flag: '🇪🇹' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hy', name: 'Armenian', flag: '🇦🇲' },
  { code: 'as', name: 'Assamese', flag: '🇮🇳' },
  { code: 'az', name: 'Azerbaijani (Latin)', flag: '🇦🇿' },
  { code: 'bn', name: 'Bangla', flag: '🇧🇩' },
  { code: 'ba', name: 'Bashkir', flag: '🇷🇺' },
  { code: 'eu', name: 'Basque', flag: '🏴' },
  { code: 'bho', name: 'Bhojpuri', flag: '🇮🇳' },
  { code: 'brx', name: 'Bodo', flag: '🇮🇳' },
  { code: 'bs', name: 'Bosnian (Latin)', flag: '🇧🇦' },
  { code: 'bg', name: 'Bulgarian', flag: '🇧🇬' },
  { code: 'yue', name: 'Cantonese (Traditional)', flag: '🇭🇰' },
  { code: 'ca', name: 'Catalan', flag: '🇦🇩' },
  { code: 'lzh', name: 'Chinese (Literary)', flag: '🇨🇳' },
  { code: 'zh-Hans', name: 'Chinese Simplified', flag: '🇨🇳' },
  { code: 'zh-Hant', name: 'Chinese Traditional', flag: '🇹🇼' },
  { code: 'sn', name: 'chiShona', flag: '🇿🇼' },
  { code: 'hr', name: 'Croatian', flag: '🇭🇷' },
  { code: 'cs', name: 'Czech', flag: '🇨🇿' },
  { code: 'da', name: 'Danish', flag: '🇩🇰' },
  { code: 'prs', name: 'Dari', flag: '🇦🇫' },
  { code: 'dv', name: 'Divehi', flag: '🇲🇻' },
  { code: 'doi', name: 'Dogri', flag: '🇮🇳' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'et', name: 'Estonian', flag: '🇪🇪' },
  { code: 'fo', name: 'Faroese', flag: '🇫🇴' },
  { code: 'fj', name: 'Fijian', flag: '🇫🇯' },
  { code: 'fil', name: 'Filipino', flag: '🇵🇭' },
  { code: 'fi', name: 'Finnish', flag: '🇫🇮' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'fr-ca', name: 'French (Canada)', flag: '🇨🇦' },
  { code: 'gl', name: 'Galician', flag: '🇪🇸' },
  { code: 'ka', name: 'Georgian', flag: '🇬🇪' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'el', name: 'Greek', flag: '🇬🇷' },
  { code: 'gu', name: 'Gujarati', flag: '🇮🇳' },
  { code: 'ht', name: 'Haitian Creole', flag: '🇭🇹' },
  { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
  { code: 'he', name: 'Hebrew', flag: '🇮🇱' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'mww', name: 'Hmong Daw (Latin)', flag: '🇨🇳' },
  { code: 'hu', name: 'Hungarian', flag: '🇭🇺' },
  { code: 'is', name: 'Icelandic', flag: '🇮🇸' },
  { code: 'ig', name: 'Igbo', flag: '🇳🇬' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
  { code: 'ikt', name: 'Inuinnaqtun', flag: '🇨🇦' },
  { code: 'iu', name: 'Inuktitut', flag: '🇨🇦' },
  { code: 'iu-Latn', name: 'Inuktitut (Latin)', flag: '🇨🇦' },
  { code: 'ga', name: 'Irish', flag: '🇮🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'kn', name: 'Kannada', flag: '🇮🇳' },
  { code: 'ks', name: 'Kashmiri', flag: '🇮🇳' },
  { code: 'kk', name: 'Kazakh', flag: '🇰🇿' },
  { code: 'km', name: 'Khmer', flag: '🇰🇭' },
  { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },
  { code: 'gom', name: 'Konkani', flag: '🇮🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'ku', name: 'Kurdish (Central)', flag: '🇮🇶' },
  { code: 'kmr', name: 'Kurdish (Northern)', flag: '🇹🇷' },
  { code: 'ky', name: 'Kyrgyz (Cyrillic)', flag: '🇰🇬' },
  { code: 'lo', name: 'Lao', flag: '🇱🇦' },
  { code: 'lv', name: 'Latvian', flag: '🇱🇻' },
  { code: 'lt', name: 'Lithuanian', flag: '🇱🇹' },
  { code: 'ln', name: 'Lingala', flag: '🇨🇩' },
  { code: 'dsb', name: 'Lower Sorbian', flag: '🇩🇪' },
  { code: 'lug', name: 'Luganda', flag: '🇺🇬' },
  { code: 'mk', name: 'Macedonian', flag: '🇲🇰' },
  { code: 'mai', name: 'Maithili', flag: '🇮🇳' },
  { code: 'mg', name: 'Malagasy', flag: '🇲🇬' },
  { code: 'ms', name: 'Malay (Latin)', flag: '🇲🇾' },
  { code: 'ml', name: 'Malayalam', flag: '🇮🇳' },
  { code: 'mt', name: 'Maltese', flag: '🇲🇹' },
  { code: 'mi', name: 'Maori', flag: '🇳🇿' },
  { code: 'mr', name: 'Marathi', flag: '🇮🇳' },
  { code: 'mn-Cyrl', name: 'Mongolian (Cyrillic)', flag: '🇲🇳' },
  { code: 'mn-Mong', name: 'Mongolian (Traditional)', flag: '🇲🇳' },
  { code: 'my', name: 'Myanmar', flag: '🇲🇲' },
  { code: 'ne', name: 'Nepali', flag: '🇳🇵' },
  { code: 'nb', name: 'Norwegian Bokmål', flag: '🇳🇴' },
  { code: 'nya', name: 'Nyanja', flag: '🇲🇼' },
  { code: 'or', name: 'Odia', flag: '🇮🇳' },
  { code: 'ps', name: 'Pashto', flag: '🇦🇫' },
  { code: 'fa', name: 'Persian', flag: '🇮🇷' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'pt', name: 'Portuguese (Brazil)', flag: '🇧🇷' },
  { code: 'pt-pt', name: 'Portuguese (Portugal)', flag: '🇵🇹' },
  { code: 'pa', name: 'Punjabi', flag: '🇮🇳' },
  { code: 'otq', name: 'Queretaro Otomi', flag: '🇲🇽' },
  { code: 'ro', name: 'Romanian', flag: '🇷🇴' },
  { code: 'run', name: 'Rundi', flag: '🇧🇮' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'sm', name: 'Samoan (Latin)', flag: '🇼🇸' },
  { code: 'sr-Cyrl', name: 'Serbian (Cyrillic)', flag: '🇷🇸' },
  { code: 'sr-Latn', name: 'Serbian (Latin)', flag: '🇷🇸' },
  { code: 'st', name: 'Sesotho', flag: '🇱🇸' },
  { code: 'nso', name: 'Sesotho sa Leboa', flag: '🇿🇦' },
  { code: 'tn', name: 'Setswana', flag: '🇧🇼' },
  { code: 'sd', name: 'Sindhi', flag: '🇵🇰' },
  { code: 'si', name: 'Sinhala', flag: '🇱🇰' },
  { code: 'sk', name: 'Slovak', flag: '🇸🇰' },
  { code: 'sl', name: 'Slovenian', flag: '🇸🇮' },
  { code: 'so', name: 'Somali (Arabic)', flag: '🇸🇴' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'sw', name: 'Swahili (Latin)', flag: '🇹🇿' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
  { code: 'ty', name: 'Tahitian', flag: '🇵🇫' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
  { code: 'tt', name: 'Tatar (Latin)', flag: '🇷🇺' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' },
  { code: 'bo', name: 'Tibetan', flag: '🇨🇳' },
  { code: 'ti', name: 'Tigrinya', flag: '🇪🇷' },
  { code: 'to', name: 'Tongan', flag: '🇹🇴' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'tk', name: 'Turkmen (Latin)', flag: '🇹🇲' },
  { code: 'uk', name: 'Ukrainian', flag: '🇺🇦' },
  { code: 'hsb', name: 'Upper Sorbian', flag: '🇩🇪' },
  { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
  { code: 'ug', name: 'Uyghur (Arabic)', flag: '🇨🇳' },
  { code: 'uz', name: 'Uzbek (Latin)', flag: '🇺🇿' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'cy', name: 'Welsh', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
  { code: 'xh', name: 'Xhosa', flag: '🇿🇦' },
  { code: 'yo', name: 'Yoruba', flag: '🇳🇬' },
  { code: 'yua', name: 'Yucatec Maya', flag: '🇲🇽' },
  { code: 'zu', name: 'Zulu', flag: '🇿🇦' },
] as const;

// See: https://www.assemblyai.com/docs/getting-started/transcribe-streaming-audio-from-a-microphone/typescript
export const broadcastLanguages = [{ code: 'en', name: 'English' }] as const;

const config = {
  isDevelopmentEnv: import.meta.env.DEV,
  socketUrl: import.meta.env.VITE_SOCKET_URL,
  apiUrl: import.meta.env.VITE_API_URL,
  languages,
  meetingCodePattern: '^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$',
} as const;

export default config;

class I18n {
  constructor(services ) {
    this.services = services;
    this.language = 'ru'
  }

  setLanguageCode(code) {
    this.language = code;
    this.services.api.defaultHeaders = {...this.services.api.defaultHeaders, 'X-Lang': this.language}
  }
}


export default I18n
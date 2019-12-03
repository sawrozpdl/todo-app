import { getUriForm } from "../utils/Utils";

export default class Api {
  constructor(site, endpoint, port) {
    this.site = site;
    this.endpoint = endpoint;
    this.port = port || 20;
    this.url = `http://${this.site}:${this.port}/${this.endpoint}`;
  }

  setAccessKey(key) {
    this.accessKey = key;
  }

  fetch(method, data) {
    let ups = "?";
    for (let key in data.params) ups += `${key}=${data[key]}&`;
    let body;
    if (data.content) body = (data.json) ? JSON.stringify(data.content) : getUriForm(data.content);
    return fetch(
      `${this.url}/${data.endpoint}${(data.subEndpoint) ? `/${data.subEndpoint}` : ''}${
        data.params ? ups.substring(0, ups.length - 1) : ""
      }`,
      {
        method: `${method}`,
        body,
        headers: {
          "Content-Type": `application/${(data.json) ? 'json' : 'x-www-form-urlencoded'}`,
          "Authorization": `Bearer ${this.accessKey}`,
          "refreshToken": `${data.refreshToken}`
        }
      }
    ).then(response => response.json());
  }

  post(data) {
    return this.fetch("POST", data);
  }

  get(data) {
    return this.fetch("GET", data);
  }

  patch(data) {
    return this.fetch("PATCH", data);
  }

  put(data) {
    return this.fetch("PUT", data);
  }

  delete(data) {
    return this.fetch("DELETE", data);
  }
}

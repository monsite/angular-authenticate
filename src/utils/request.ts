/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const CSRFCookieName = "XSRF-TOKEN";
const handlers:any=[];

export function put(url:string, body:any, options = {}) {
  return request({
    url,
    body,
    method: "PUT",
    ...options
  });
}

export function post(url:string, body:any, options = {}) {
  return request({
    url,
    body,
    method: "POST",
    ...options
  });
}

export function get(url:string, query:any, options = {}) {
  return request({
    url,
    query,
    method: "GET",
    ...options
  });
}

export function del(url:string, query:any, options = {}) {
  return request({
    url,
    query,
    method: "DELETE",
    ...options
  });
}

export function addHandler(fct:any, priority:any = 0) {
  handlers.push({ fct, priority });
  handlers.sort((a:any, b:any) => b.priority - a.priority);
}

export function removeHandler(fct:any) {
  handlers.splice(
    handlers.indexOf(handlers.find((entry:any) =>{entry.fct === fct} )),
    1
  );
}

export async function request(payload:any) {
  const { url, method, body, query, headers } = payload;
  const resourceUrl = query
    ? `${replaceApiPlaceholders(url)}?${formatQuery(query)}`
    : replaceApiPlaceholders(url);

  const XSRFToken = document.cookie.replace(
    new RegExp(`(?:(?:^|.*;*)${CSRFCookieName}*=*([^;]*).*$)|^.*$`),
    "$1"
  );
  let requestHeaders = {
    "Content-Type": "application/json",
    "X-Authorized-Engine": "default",
    Accept: "application/json, text/plain, */*",
    ...headers
  };

  if (XSRFToken) {
    requestHeaders["X-XSRF-TOKEN"] = XSRFToken;
  }

  let response = await fetch(resourceUrl, {
    method,
    body: processBody(body),
    headers: requestHeaders,
    mode: "cors",
    credentials: "same-origin"
  });

  for (let i = 0; i < handlers.length; i++) {
    response = await handlers[i].fct(response, payload);
  }

  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw response;
  }
}

export function formatQuery(query:any) {
  return Object.keys(query).reduce((queryStr, key) => {
    const value = query[key];

    if (Array.isArray(value)) {
      const str = value.map(val => `${key}=${val}`).join("&");
      if (!str) {
        return queryStr;
      }
      return queryStr === "" ? str : queryStr + "&" + str;
    }

    if (queryStr === "") {
      return `${key}=${encodeURIComponent(value)}`;
    }

    return `${queryStr}&${key}=${encodeURIComponent(value)}`;
  }, "");
}

function processBody(body:any) {
  if (typeof body === "string") {
    return body;
  }

  return JSON.stringify(body);
}

function replaceApiPlaceholders(url:any) {
  const base:any = document.querySelector("base");
  const engine = window.location.href.replace(/.*cockpit\/([^/]*).*/, "$1");

  return (
    url
      .replace("%ADMIN_API%", base.getAttribute("admin-api").slice(0, -1))
      .replace("%COCKPIT_API%", base.getAttribute("cockpit-api").slice(0, -1))
      .replace(
        "%ENGINE_API%",
        base.getAttribute("engine-api") + "engine/" + engine
      )
      .replace("%ENGINE%", engine)
      .replace("%API%", base.getAttribute("engine-api"))
      // Remove double slashes
      .replace(/([^:])(\/\/+)/g, "$1/")
  );
}

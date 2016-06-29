import {Aurelia} from "aurelia-framework";
import {bootstrap} from "aurelia-bootstrapper-webpack";
import {ViewLocator} from "aurelia-framework";
import {DataCache} from "./dataCache";
import {PlugIn1} from "./plugin1";
import {PlugIn2} from "./plugin2";

bootstrap(async (aurelia: Aurelia) => {
  let cache = new DataCache();
  cache.data.push("1");
  cache.data.push("2");
  cache.data.push("3");

  aurelia.use
    .transient("SuperPlugIn", PlugIn1)
    .transient("SuperPlugIn", PlugIn2)
    .instance("Cache", cache)
    .standardConfiguration()
    .developmentLogging();

  // ViewLocator.prototype.convertOriginToViewUrl = (origin) => {
  //   let moduleId = origin.moduleId;
  //   var id = (moduleId.endsWith(".js") || (moduleId.endsWith(".ts")) ?
  //     moduleId.substring(0, moduleId.length - 3) : moduleId);
  //   return id.replace("viewmodels", "views") + ".html";
  // }
  //Uncomment the line below to enable animation.
  // aurelia.use.plugin("aurelia-animator-css");
  //if the css animator is enabled, add swap-order="after" to all router-view elements

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin("aurelia-html-import-template-loader")

  const rootElement = document.body;
  rootElement.setAttribute("aurelia-app", "");

  await aurelia.start();
  //aurelia.setRoot("app", rootElement);
  aurelia.setRoot("shell", rootElement);
  // if you would like your website to work offline (Service Worker), 
  // install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code:
  /*
  const offline = await System.import("offline-plugin/runtime");
  offline.install();
  */
});

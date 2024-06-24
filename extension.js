// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const axios = require("axios");
const xmlParser = require("fast-xml-parser");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  const res = await axios.get("https://syedrabeet.hashnode.dev/rss.xml");

  const articles = xmlParser.parse(res.data).rss.channel.item.map((article) => {
    return {
      label: article.title,
      detail: article.description,
      link: article.link,
    };
  });

  //   console.log(res.data, "lasst");
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // console.log('Congratulations, your extension "quick-search" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "blog-hopper.helloWorld",
    async function () {
      const article = await vscode.window.showQuickPick(articles, {
        matchOnDetail: true,
      });
      if (articles == null) return;

      vscode.env.openExternal(article.link);
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from Blog Hopper!");
    }
  );

  context.subscriptions.push(disposable);
}
//
// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 12
   Case Problem 3

   Author: Evelyn Duarte
   Date: 04.05.19  

   Filename: js_tree.js

   Global Variables:
   nodeCount
      Running count of all nodes in the source document
   elementCount
      Running count of all element nodes in the source document
   textCount
      Running count of all text nodes in the source document
   wsCount
      Running count of all white space text nodes in the source document


   Functions List:
   makeTree() 
      Sets up and places the node tree within the HTML document and
      displays the node counts from the document

   makeBranches(treeNode, nestedList)
      Makes a list item or an ordered list based on the contents and type
      of node from the sourceNode parameter and then appends that list
      item or ordered list to nestedList. The function recursively calls 
      itself to navigate throught the node tree of the source document.

   isWhiteSpaceNode(tString)
      Returns true if tString represents the text of a white space text
      node and false if it doesn't
*/

//declared variable and set initial value to zero.
var nodeCount = 0;
var elemCount = 0;
var textCount = 0;
var wsCount = 0;
//The makeTree function will load as the window does
window.onload = makeTree;

//For the makeTree function the aside element is created and to place the h1 within, you must append that variable to the variable where you created the aside element. Then, i simply declared the function makeBranches. Lastly, displayed all nodes by getting their id, giving propert of textcontent. 
function makeTree() {
      var eD = document.createElement("aside");
      eD.setAttribute("id", "treeBox");
      var evi = document.createElement("h1");
      evi.textContent = "Node Tree";
      eD.appendChild(evi);
      document.getElementById("main").appendChild(eD);

      var nodeList = document.createElement("ol");

      eD.appendChild(nodeList);

      var sourceArticle = document.querySelector("#main article");

      makeBranches(sourceArticle, nodeList);

      document.getElementById("totalNodes").textContent = nodeCount;
      document.getElementById("elemNodes").textContent = elemCount;
      document.getElementById("textNodes").textContent = textCount;
      document.getElementById("wsNodes").textContent = wsCount;
}

function makeBranches(treeNode, nestedList) {
      //increases by increments of 1, with creating an li element. then, within, there is text. then appending the spanElem within liElem and liElem within nestedelem.
      nodeCount++;
      var liElem = document.createElement("li");
      liElem.innerHTML += "+--";
      var spanElem = document.createElement("span");

      liElem.appendChild(spanElem);
      nestedList.appendChild(liElem);

      //Created an if else staments which claims that if treeNode is equal to 1 then, it will do he following. Otherwise, if it equals 3 then, it will do the following.
      if (treeNode.nodeType === 1) {
            elemCount++;
            spanElem.setAttribute("class", "elementNode");
            spanElem.textContent = "<" + treeNode.nodeName + ">"
      } else if (treeNode.nodeType === 3) {
            textCount++;
            var textString = treeNode.nodeValue;
            // within the else if, is an if, else statement which states if the condition is the function then it will have an increase of 1, attribute and textContent. otherwise, it will have a different attribute and textContent.
            if (isWhiteSpaceNode(textString)) {
                  wsCount++;
                  spanElem.setAttribute("class", "whiteSpaceNode");
                  spanElem.textContent = "#text";
            } else {
                  spanElem.setAttribute("class", "textNode");
                  spanElem.textContent = textString;
            }
            // Within, the if statement, there is a for loop that will loop through the treeNode.
      }
      if (treeNode.childNodes.length > 0) {
            var newList = document.createElement("ol");
            newList.innerHTML = "|";
            nestedList.appendChild(newList);
            for (var n = treeNode.firstChild; n !== null; n = n.nextSibling) {
                  makeBranches(n, newList);
            }
      }
}

function isWhiteSpaceNode(tString) {
      return !(/[^\t\n\r ]/.test(tString));
}
/** 
<div id="parent">
  <div class="child1">
    <h1>I am h1 tag</h1>
    <h2>I am h2 tag</h2>
  </div>
  <div id="child2">
      <h1>I am h1 tag c2</h1>
      <h2>I am h2 tag c2</h2>
  </div>
</div>
*/
const root = ReactDOM.createRoot(document.getElementById("root"));
const domToRender = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child1" }, [
    React.createElement("h1", {}, "I am h1 tag c1"),
    React.createElement("h2", {}, "I am h2 tag c1"),
  ]),
  React.createElement("div", { id: "child2" }, [
    React.createElement("h1", {}, "I am h1 tag c2"),
    React.createElement("h2", {}, "I am h1 tag c2"),
  ]),
]);

// JSX

root.render(domToRender);

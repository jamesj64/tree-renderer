import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

type TreeType =
{
    formula: string,
    children?: TreeType[]
}

const getNodeArray = (tree: TreeType) => {
    let treeArray: any = [{ key: 0, text: tree.formula, fill: "#f68c06", stroke: "#4d90fe" }];
    const flattenTree: any = (tree: TreeType, index = 0) => {
        if (!tree.children) return;
        const initialLength = treeArray.length;
        tree.children.forEach(child => {
            treeArray.push({ key: treeArray.length, text: child.formula, fill: "#f68c06", stroke: "#4d90fe", parent: index });
            flattenTree(child, index + treeArray.length - initialLength);
        });
    }
    flattenTree(tree);
    return treeArray;
}

//https://gojs.net/latest/samples/parseTree.html
class FlatTreeLayout extends go.TreeLayout {
    commitLayout() {
      super.commitLayout();
      var y = -Infinity;
      this.network.vertexes.each(v => y = Math.max(y, v.node.position.y));
      this.network.vertexes.each(v => {
        if (v.destinationEdges.count === 0) {
          v.node.position = new go.Point(v.node.position.x, y);
          v.node.toEndSegmentLength = Math.abs(v.centerY - y);
        } else {
          v.node.toEndSegmentLength = 10;
        }
      });
    }
  }

//https://gojs.net/latest/samples/parseTree.html
const Tree = (json: any) => {
    const $ = go.GraphObject.make;

    const diagram =
      $(go.Diagram,
        {
          allowDelete: false,
          allowMove: false,
          allowCopy: false,
          initialAutoScale: go.Diagram.Uniform,
          layout:
            $(FlatTreeLayout, {
              angle: 90,
              compaction: go.TreeLayout.CompactionNone
            }),
          "undoManager.isEnabled": true
        });

    diagram.nodeTemplate =
    $(go.Node, "Vertical",
        { selectionObjectName: "BODY" },
        $(go.Panel, "Auto", { name: "BODY" },
        $(go.Shape, "RoundedRectangle",
            new go.Binding("fill"),
            new go.Binding("stroke")),
        $(go.TextBlock,
            { font: "bold 18pt Arial, sans-serif", margin: new go.Margin(4, 2, 2, 2) },
            new go.Binding("text"))
        ),
        $(go.Panel,
            { height: 17 }
        )
    );

    diagram.linkTemplate =
      $(go.Link,
        $(go.Shape, { strokeWidth: 1.5 }));

    const myNodeData = getNodeArray(json);
    
    diagram.model =
      new go.TreeModel(
          { nodeDataArray: myNodeData}
      );
    return (
        <ReactDiagram 
            initDiagram={() => diagram}
            divClassName='diagram-component'
            nodeDataArray={myNodeData}
        />
    );
};

export { Tree };
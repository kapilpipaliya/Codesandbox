import * as React from 'react';
import { Group, Layer, Rect, Stage } from 'react-konva';

/*
 * For complex animation I recommend to use React methods. Somethings like:
 * https://github.com/chenglou/react-motion
 * https://github.com/chenglou/react-tween-state
 * But for simple cases you can use Konva methods:
 */

// Try drag& drop rectangle
class MyRect extends React.Component {
  changeSize() {
    this.refs.rect.to({
      'scaleX': Math.random() + 0.8,
      'scaleY': Math.random() + 0.8,
      'duration': 0.2
    });
  }

  render() {
    return (
      <Group>
        <Rect
          ref="rect"
          width="50"
          height="50"
          fill="green"
          draggable="true"
          onDragEnd={this.changeSize.bind(this)}
          onDragStart={this.changeSize.bind(this)}
        />
      </Group>
    );
  }
}

export default function App() {
  return (
    <Stage width={700} height={700}>
      <Layer>
        <MyRect/>
      </Layer>
    </Stage>
  );
}

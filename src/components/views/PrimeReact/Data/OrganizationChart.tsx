import * as React from 'react';
import { OrganizationChart } from 'primereact/components/organizationchart/OrganizationChart';
// https://www.primefaces.org/primereact/#/organizationchart

var data1 = [{
  label: 'CEO',
  type: 'person',
  className: 'ui-person',
  expanded: true,
  data: { name: 'Walter White', 'avatar': 'walter.jpg' },
  children: [
    {
      label: 'CFO',
      type: 'person',
      className: 'ui-person',
      expanded: true,
      data: { name: 'Saul Goodman', 'avatar': 'saul.jpg' },
      children: [{
        label: 'Tax',
        className: 'department-cfo'
      },
      {
        label: 'Legal',
        className: 'department-cfo'
      }],
    },
    {
      label: 'COO',
      type: 'person',
      className: 'ui-person',
      expanded: true,
      data: { name: 'Mike E.', 'avatar': 'mike.jpg' },
      children: [{
        label: 'Operations',
        className: 'department-coo'
      }]
    },
    {
      label: 'CTO',
      type: 'person',
      className: 'ui-person',
      expanded: true,
      data: { name: 'Jesse Pinkman', 'avatar': 'jesse.jpg' },
      children: [{
        label: 'Development',
        className: 'department-cto',
        expanded: true,
        children: [{
          label: 'Analysis',
          className: 'department-cto'
        },
        {
          label: 'Front End',
          className: 'department-cto'
        },
        {
          label: 'Back End',
          className: 'department-cto'
        }]
      },
      {
        label: 'QA',
        className: 'department-cto'
      },
      {
        label: 'R&D',
        className: 'department-cto'
      }]
    }
  ]
}];
var data2 = [{
  label: 'F.C Barcelona',
  expanded: true,
  children: [
    {
      label: 'F.C Barcelona',
      expanded: true,
      children: [
        {
          label: 'Chelsea FC'
        },
        {
          label: 'F.C. Barcelona'
        }
      ]
    },
    {
      label: 'Real Madrid',
      expanded: true,
      children: [
        {
          label: 'Bayern Munich'
        },
        {
          label: 'Real Madrid'
        }
      ]
    }
  ]
}];

export default class Kapil extends React.Component {
  // Selection
  constructor(props) {
    super(props);
    this.state = { selections: [] };
    this.onSelectionChange = this.onSelectionChange.bind(this);
  }

  onSelectionChange(_selections) {
    this.setState({ selections: _selections });
  }

  // Templating
  nodeTemplate(node) {
    if (node.type === 'person') {
      return (<div>
        <div className="node-header ui-corner-top">{node.label}</div>
        <div className="node-content">
          <img alt={node.data.avatar} src={`showcase/resources/demo/images/organization/${node.data.avatar}`} style={{ width: '32px' }} />
          <div>{node.data.name}</div>
        </div>
      </div>);
    }

    if (node.type === 'department') {
      return node.label;
    }

    return node.label;
  }

  render() {
    return (
        <div>
          <OrganizationChart
            value={data1}
            nodeTemplate={this.nodeTemplate.bind(this)}
            selectionMode="multiple" 
            selectionChange={this.onSelectionChange} 
            className="company"></OrganizationChart>
          <ul>
            {
              this.state.selections && this.state.selections.map((item, index) => {
                return <li key={index}>{item.label}</li>;
              })
            }
          </ul>
        </div>
    );
  }
}

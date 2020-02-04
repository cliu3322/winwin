import React, { useState } from 'react';
import { Input, Select, Layout, Button, Row, Col } from 'antd';

class PriceInput extends React.Component {
  handleNumberChange = e => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    this.triggerChange({ number });
  };

  handleCurrencyChange = currency => {
    this.triggerChange({ currency });
  };

  triggerChange = changedValue => {
    const { onChange, value } = this.props;
    if (onChange) {
      onChange({
        ...value,
        ...changedValue,
      });
    }
  };

  render() {
    const { size, value } = this.props;
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={value ? value.number : 0}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
        <Select
          value={value ? value.currency : 'silver'}
          size={size}
          style={{ width: '32%' }}
          onChange={this.handleCurrencyChange}
        >
          <Select.Option value="silver">Silver</Select.Option>
          <Select.Option value="dollar">Dollar</Select.Option>
        </Select>
      </span>
    );
  }
}

const styles = {
  layout: { flexDirection: 'row', overflowX: 'hidden' },
  content: {
    padding: '10px 5px 5px',
    flexShrink: '0',
    background: '#f1f3f6',
    position: 'relative',
  },
  footer: {
    background: '#ffffff',
    textAlign: 'center',
    borderTop: '1px solid #ededed',
  },
};
export default function Ticket() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <Layout style={styles.layout}>
      <Layout.Content style={styles.content}>
        <Row type="flex" justify="center" style={{ marginBottom: 8 }}>
          <PriceInput />
        </Row>
        <Row type="flex" justify="space-around">
          <Button type="primary">BUY</Button>
          <Button type="danger">SELL</Button>
        </Row>
      </Layout.Content>
    </Layout>
  );
}

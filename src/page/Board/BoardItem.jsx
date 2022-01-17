import React, { Component } from 'react';
import { connect } from 'react-redux';
import { board_read, board_remove } from './App_reducer';

class BoardItem extends Component {
  handleUpdateForm = (brdno) => {
    this.props.dispatch(board_read(brdno));
  };
  render() {
    const row = this.props.row;
    return (
      <tr>
        {' '}
        <td>{row.brdno}</td>{' '}
        <td>
          <a onClick={() => this.handleUpdateForm(row.brdno)}>{row.brdtitle}</a>
        </td>{' '}
        <td>{row.brdwriter}</td>{' '}
        <td>{row.brddate.toLocaleDateString('ko-KR')}</td>{' '}
        <td>
          <a
            onClick={() => {
              this.props.dispatch(board_remove(row.brdno));
            }}
          >
            X
          </a>
        </td>{' '}
      </tr>
    );
  }
}
export default connect()(BoardItem);

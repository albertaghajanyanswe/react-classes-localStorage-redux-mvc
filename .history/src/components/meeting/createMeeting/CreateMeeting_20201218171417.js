import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'antd/lib/modal/Modal';
import { Input, Select, TimePicker, DatePicker, Form, Button} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import { MeetingAction } from '../../../mRedux/actions/MeetingAction';

const { Option } = Select;
const { RangePicker } = TimePicker;

const initialValues = {
  date: "",
  description: "",
  membersId: [],
  time: null,
  title: ""
}

/* CreateMeeting VIEW */

class CreateMeetingView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editedData: {},
      loading: true
    }
    this.updatedEditedData = this.updatedEditedData.bind(this);
    this.getRegistredUsersList = this.getRegistredUsersList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.createMeeting = this.createMeeting.bind(this);
    this.updateMeeting = this.updateMeeting.bind(this);
    this.renderFormFooter = this.renderFormFooter.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.editedMeeting !== this.props.editedMeeting || this.props.editedMeeting === {}) {
      this.updatedEditedData();
    }
  }

  updatedEditedData() {
    const itemData = this.props.isEditMode ? {...this.props.editedMeeting} : {};
    if (itemData.date) {
      itemData.date = moment(itemData.date);
    }
    if (itemData.time) {
      itemData.time[0] = moment(itemData.time[0], 'HH:mm');
      itemData.time[1] = moment(itemData.time[1], 'HH:mm');
    }
    this.setState({
      editedData: {...initialValues, ...itemData},
      loading: false
    })
  }

  getRegistredUsersList() {
    const children = [];
    const {user, users} = this.props;
    users && users.forEach(i => {
      if (user.id !== i.id) {
        children.push(<Option key={i.id}>{i.firstname} {i.lastname}</Option>);
      }
    });
    return children;
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  handleCancel() {
    this.setState({editedData: {}, loading: true});
    this.props.handleCancel()
  }

  onFinish(values) {
    if (this.props.isEditMode) {
      this.updateMeeting(values);
    } else {
      this.createMeeting(values);
    }
  }

  createMeeting(values) {
    const originalObj = {
      ...initialValues,
      ...JSON.parse(JSON.stringify(values))
    }

    if (originalObj.date) {
      originalObj.date = moment(originalObj.date).format("YYYY-MM-DD");
    }
    if (originalObj.time) {
      originalObj.time[0] = moment(originalObj.time[0]).format("HH:mm");
      originalObj.time[1] = moment(originalObj.time[1]).format("HH:mm");
    }

    this.props.addMeeting(originalObj, this.props.user.id);
    this.setState({editedData: {}, loading: true});
    this.props.handleOk();
  }

  updateMeeting = (values) => {
    console.log("Updated...........", values)
    console.log("Updated editedMeeting...........", this.props.editedMeeting)
    const t = this.props.meetings.find(i => {
      return i.id === editedMeeting.id
    })
    console.log("Updated editedMeeting...........", this.props.editedMeeting)

  }

  renderFormFooter() {
    return (
      <Form.Item>
        <Button onClick={this.handleCancel} className='default-btn'>Cancel</Button>
        <Button htmlType='submit' className='primary-btn'>{this.props.isEditMode ? 'Edit' : 'Create'}</Button>
      </Form.Item>
    );
  };

  render() {
    return(
      <div>
        <Modal
          title='Create Meeting'
          visible={this.props.show}
          onCancel={this.handleCancel}
          okText='Create'
          wrapClassName='create-modal-container'
          footer={null}
        >
          <div>
            {this.state.loading ? (<div>Loading...</div>) : (<Form
            onFinish={this.onFinish}
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            layout='horizontal'
            initialValues={{...this.state.editedData}}
            >
              <Form.Item name='title' label='Title'>
                <Input className='default-border-styles' placeholder='Title'/>
              </Form.Item>
              <Form.Item name='membersId' label='Select Meeting Members'>
                <Select
                  mode='multiple'
                  allowClear
                  style={{ width: '100%' }}
                  placeholder='Please select'
                  onChange={this.handleChange}
                  className='default-border-styles'
                >
                  {this.getRegistredUsersList()}
                </Select>
              </Form.Item>
              <Form.Item name='date' label='Select Date'>
                <DatePicker className='default-border-styles'/>
              </Form.Item>
              <Form.Item name='time' label='Select Time'>
                <RangePicker className='default-border-styles' showNow showSecond={false}/>
              </Form.Item>
              <Form.Item name='description' label='Description'>
              <TextArea className='default-border-styles' placeholder='Description'/>
              </Form.Item>
              <div className='form-footer'>
                {this.renderFormFooter()}
              </div>
          </Form>)}
          </div>
        </Modal>
      </div>
    )
  }


};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    users: state.auth.users,
    meetings: state.meetings.meetings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMeeting(meetings, ownerId) {
      return dispatch(MeetingAction.addMeeting(meetings, ownerId));
    }
  }
}

/* CreateMeeting CONTROLLER */

const CreateMeeting = withRouter(CreateMeetingView);
export default connect(mapStateToProps, mapDispatchToProps)(CreateMeeting);
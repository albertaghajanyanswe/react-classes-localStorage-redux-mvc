import React, { Component } from 'react';
import { Button, Row } from 'antd';
import CreateMeeting from './createMeeting/CreateMeeting';
import MeetingCard from './meetingCard/MeetingCard';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* Meeting VIEW */

class MeetingView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCreateModal: false,
      needToRender: false,
      isEditMode: false,
      editedMeeting: {}
    }
    this.clickCreateMeetingBtn = this.clickCreateMeetingBtn.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.setNeedToRender = this.setNeedToRender.bind(this);
    this.setEditedMeeting = this.setEditedMeeting.bind(this);
    this.setShowCreateModal = this.setShowCreateModal.bind(this);
    this.setIsEditMode = this.setIsEditMode.bind(this);
  }

  clickCreateMeetingBtn() {
    this.setState({
      isEditMode: false,
      editedMeeting: {},
      showCreateModal: true
    });
  };

  handleOk() {
    this.setState({
      showCreateModal: false
    });
  };

  handleCancel() {
    this.setState({
      showCreateModal: false
    });
  };

  setNeedToRender(value) {
    this.setState({needToRender: value});
  }

  setIsEditMode(value) {
    this.setState({isEditMode: value});
  }

  setEditedMeeting(value) {
    this.setState({editedMeeting: value});
  }

  setShowCreateModal(value) {
    this.setState({showCreateModal: value});
  }

  render() {
    const {showCreateModal, needToRender, isEditMode, editedMeeting} = this.state;
    const {user, meetings} = this.props;

    return (
      <div className='meeting-container'>
        <Button onClick={this.clickCreateMeetingBtn} className='create-meeting-btn'>Create new meeting</Button>
        <CreateMeeting
         show={showCreateModal}
         isEditMode={isEditMode}
         editedMeeting={editedMeeting}
         handleOk={this.handleOk}
         handleCancel={this.handleCancel}
       />
        <div className="site-card-wrapper">
          <h3 style={{textAlign: 'center', marginBottom: '30px'}}>Existing Meetings</h3>
         <Row gutter={16}>
             {meetings && meetings.map(i => {
               if (i.ownerId === user.id || i.membersId.includes(user.id)) {
                 return <MeetingCard
                          item={i}
                          key={i.id}
                          setNeedToRender={this.setNeedToRender}
                          needToRender={needToRender} setIsEditMode={this.setIsEditMode} setEditedMeeting={this.setEditedMeeting} setShowCreateModal={this.setShowCreateModal}/>
               }
           })}
         </Row>
       </div>
      </div>
     );
  }

};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    meetings: state.meetings.meetings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incressNumber(counter) {
    }
  }
}

const Meeting = withRouter(MeetingView);

/* Meeting CONTROLLER */
export default connect(mapStateToProps, mapDispatchToProps)(Meeting);

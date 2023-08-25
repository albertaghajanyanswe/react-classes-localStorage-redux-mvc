import React, { Component } from 'react';
import {Skeleton, Card, Avatar, Col, Divider, Tag} from 'antd'
import { toRGB } from '../../../utils/generateColor';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { MeetingAction } from '../../../mRedux/actions/MeetingAction';

const { Meta } = Card;

/* MeetingCard VIEW */

class MeetingCardView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: props.item ? false : true
    }

    this.getMeetingMembers = this.getMeetingMembers.bind(this);
    this.deleteMeeting = this.deleteMeeting.bind(this);
    this.editMeeting = this.editMeeting.bind(this);
    this.getMeetingOwner = this.getMeetingOwner.bind(this);
  }

  getMeetingMembers() {
    const members = [];
    this.props.item && this.props.item.membersId && this.props.item.membersId.length && this.props.item.membersId.map(i => {
      this.props.users.filter(u => {
        if (u.id === i) {
          members.push(u)
        }
      });
    });
    return members;
  }


  deleteMeeting(id) {
    const filteredData = this.props.meetings.filter(i=>{
      return i.id !== id;
    });
    this.props.deleteMeeting(filteredData);
    this.props.setNeedToRender(!this.props.needToRender);
  }

  editMeeting(item) {
    this.props.setIsEditMode(true);
    this.props.setEditedMeeting(item);
    this.props.setShowCreateModal(true);
  }

  getMeetingOwner() {
    console.log("this.props.users = ", this.props.users)
    console.log("this.props.users = ", this.props.users)
    return this.props.users.find(i => i.id === this.props.item.ownerId);
  }

  render() {
    const meetingOwner = this.getMeetingOwner();
    const members = this.getMeetingMembers();

    const {item, user} = this.props;
    const {loading} = this.state;

    return (
      <Col span={8} key={this.props.item.id}>
        <Card
          style={{ marginTop: 16 }}
          actions={item.ownerId === user.id ? [
              <EditOutlined key="edit" onClick={() => {
                this.editMeeting(item)
              }}/>,
              <CloseOutlined key="delete" onClick={() => {
                this.deleteMeeting(item.id)
              }
              } />,
          ] : []}
          hoverable
        >
          <Skeleton loading={loading} avatar active>
            <Meta
              avatar={
                <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
              }
              title={`${item.title || 'Subject not set'}`}
              description={
                <div>
                  <p>{item.description ? item.description : 'Description not set'}</p>
                  <p>{item.time ? `${item.time[0]} - ${item.time[1]}` : 'Time not set'}</p>
                  <p>{item.date ? item.date : 'Date not set'}</p>
                  <Divider orientation="center">Members</Divider>
                  <div>
                    {members && members.map(i => {
                      return <Tag style={{...toRGB(`${i.firstname} ${i.lastname}`)}} >{i.firstname} {i.lastname}</Tag>
                    })}
                  </div>
                  <Divider orientation="center">Created by</Divider>
                  <div>
                    {console.log("3333333 ", meetingOwner)}
                    {<Tag style={{...toRGB(`${meetingOwner.firstname} ${meetingOwner.lastname}`)}} >{meetingOwner.firstname} {meetingOwner.lastname}</Tag>}
                  </div>
                </div>
              }
            />
          </Skeleton>
        </Card>
      </Col>
    );
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
    deleteMeeting(meetings) {
      return dispatch(MeetingAction.deleteMeeting(meetings));
    }
  }
}

const MeetingCard = withRouter(MeetingCardView);

/* MeetingCard CONTROLLER */
export default connect(mapStateToProps, mapDispatchToProps)(MeetingCard);

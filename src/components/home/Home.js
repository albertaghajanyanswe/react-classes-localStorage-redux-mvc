import React, { Component } from 'react';
import {Skeleton, Card, Avatar} from 'antd'
import { getStorageData } from '../../utils/helper';

const { Meta } = Card;

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: {}
    }
  }
  componentDidMount() {
    if (!Object.keys(this.state.currentUser).length) {
      setTimeout(() => {
        const user = getStorageData('user') || {};
        this.setState({ currentUser: user, loading: Object.keys(user).length ? false : true });
      }, 700)
    }
  }

  render() {
    const {currentUser, loading} = this.state;
    return (
      <div>
       <Card
         style={{ width: 300, marginTop: 16 }}
         actions={[]}
       >
         <Skeleton loading={loading} avatar active>
           <Meta
             avatar={
               <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
             }
             title={`${currentUser.firstname} ${currentUser.lastname}`}
             description={
               <div>About</div>
             }
           />
         </Skeleton>
       </Card>
      </div>
     );
  }

};

export default Home;

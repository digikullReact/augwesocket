import React ,{useEffect,useState} from 'react'
import { io } from "socket.io-client";
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import { List, Typography, Divider } from 'antd';



const { Search } = Input;
const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

const Socket = () => {

    const [socketObj,setSocketObj]=useState({});
    const [socketData,setSocketData]=useState([]);

  

    const onSearch = value => {
        // Sending data to socket server
      //  console.log(value);
      socketObj.emit("message",value);

    }


    useEffect(()=>{
        const socket = io();
        setSocketObj(socket);

        socket.on("receive",function(data){
            socketData.push(data);
            setSocketData([...socketData]);
        })


    },[])
  return (
    <div style={{marginTop:"150px"}}>

<Row >
   
      <Col span={12} offset={6}>
      <h2>Chat App</h2>
      <Search
      placeholder="Your Message"
      enterButton="Send Message"
      size="large"
      suffix={suffix}
      onSearch={onSearch}
    />
      </Col>
    </Row>

    <Row style={{marginTop:"30px"}}>
    <Col span={12} offset={6}>

    <List
      size="large"
      header={<div>Latest Messages</div>}
      footer={<div>That's All Folks</div>}
      bordered
      dataSource={socketData}
      renderItem={item => <List.Item>{item}</List.Item>}
    />


    </Col>

  
    </Row>


    </div>
  )
}

export default Socket
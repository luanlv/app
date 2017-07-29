import React from 'react'
import { Upload, Icon, Modal, Button} from 'antd';

const fileList = [];


class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      //   {
      //   uid: -1,
      //   name: 'xxx.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // }
    ],
  };
  
  handleCancel = () => this.setState({ previewVisible: false })
  
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  
  handleChange = ({ fileList }) => {
    this.setState({ fileList })
    if(fileList.length > 0 && fileList[0].response){
      this.props.handleChange(fileList[0].response.url)
    }
  }
  
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Chọn ảnh</div>
      </div>
    );
    return (
      <div className="clearfix">
        {/*<Upload*/}
          {/*// action="http://api.colombus.vn/upload/image"*/}
          {/*action="http://192.168.1.104:8000/upload/image"*/}
          {/*listType="picture-card"*/}
          {/*fileList={fileList}*/}
          {/*onPreview={this.handlePreview}*/}
          {/*onChange={this.handleChange}*/}
        {/*>*/}
          {/*{fileList.length >= 1 ? null : uploadButton}*/}
        {/*</Upload>*/}
        
        <Upload
          action={"http://api.colombus.vn/upload/image"}
          // action ={"http://192.168.1.104:8000/upload/image"}
          listType={'picture'}
          defaultFileList={[...fileList]}
          className={'upload-list-inline'}
          onChange={this.handleChange}
        >
          {fileList.length === 0 && <Button>
            <Icon type="upload" /> Chọn ảnh
          </Button>}
          
        </Upload>
        
        
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall
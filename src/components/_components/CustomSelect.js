import React from 'react'
import {Row, Col, Input, Button, message, Select, AutoComplete, InputNumber} from 'antd'
import {slugify} from '../_function'
const Option = Select.Option;

class CustomSelect extends React.Component {
  render () {
    return (
      <Select
        showSearch
        style={{ width: "32%", marginLeft: 5, marginTop: 5  }}
        defaultValue={this.props.defaultValue}
        optionFilterProp="children"
        placeholder="Tỉnh thành"
        onChange={this.props.handleChange}
        filterOption={(input, option) => slugify(option.props.children.toLowerCase()).indexOf(slugify(input.toLowerCase())) >= 0}
      >
        <Option value="76">An Giang</Option>
        <Option value="64">	Bà Rịa-Vũng Tàu</Option>
        <Option value="781">Bạc Liêu</Option>
        <Option value="281">Bắc Kạn</Option>
        <Option value="240">Bắc Giang</Option>
        <Option value="241">Bắc Ninh</Option>
        <Option value="75">Bến Tre</Option>
        <Option value="650">Bình Dương</Option>
        <Option value="56">Bình Định</Option>
        <Option value="651">Bình Phước</Option>
        <Option value="62">Bình Thuận</Option>
        <Option value="290">Cà Mau</Option>
        <Option value="206">Cao Bằng</Option>
        <Option value="292">Cần Thơ</Option>
        <Option value="236">Đà Nẵng</Option>
        <Option value="500">Đắk Lắk</Option>
        <Option value="51">Đắk Nông</Option>
        <Option value="23">Điện Biên</Option>
        <Option value="61">Đồng Nai</Option>
        <Option value="67">Đồng Tháp</Option>
        <Option value="59">Gia Lai</Option>
        <Option value="291">Hà Giang</Option>
        <Option value="351">Hà Nam</Option>
        <Option value="4">Hà Nội</Option>
        <Option value="9">Hà Tĩnh</Option>
        <Option value="320">Hải Dương</Option>
        <Option value="225">Hải Phòng</Option>
        <Option value="711">Hậu Giang</Option>
        <Option value="218">Hòa Bình</Option>
        <Option value="82">Thành phố Hồ Chí Minh</Option>
        <Option value="321">Hưng Yên</Option>
        <Option value="258">Khánh Hoà</Option>
        <Option value="77">Kiên Giang</Option>
        <Option value="60">Kon Tum</Option>
        <Option value="213">Lai Châu</Option>
        <Option value="25">Lạng Sơn</Option>
        <Option value="20">Lào Cai</Option>
        <Option value="263">Lâm Đồng</Option>
        <Option value="72">Long An</Option>
        <Option value="350">Nam Định</Option>
        <Option value="38">Nghệ An</Option>
        <Option value="30">Ninh Bình</Option>
        <Option value="68">Ninh Thuận</Option>
        <Option value="211">Phú Thọ</Option>
        <Option value="57">Phú Yên</Option>
        <Option value="52">Quảng Bình</Option>
        <Option value="510">Quảng Nam</Option>
        <Option value="50">Quảng Ngãi</Option>
        <Option value="203">Quảng Ninh</Option>
        <Option value="53">Quảng Trị</Option>
        <Option value="79">Sóc Trăng</Option>
        <Option value="22">Sơn La</Option>
        <Option value="66">Tây Ninh</Option>
        <Option value="36">Thái Bình</Option>
        <Option value="380">Thái Nguyên</Option>
        <Option value="234">Thừa Thiên-Huế</Option>
        <Option value="73">Tiền Giang</Option>
        <Option value="74">Trà Vinh</Option>
        <Option value="27">Tuyên Quang</Option>
        <Option value="70">	Vĩnh Long</Option>
        <Option value="210">Vĩnh Phúc</Option>
        <Option value="29">Yên Bái</Option>
      </Select>
    )
  }
}

export default CustomSelect
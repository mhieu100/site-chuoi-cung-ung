import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  PageContainer,
  ProCard
} from '@ant-design/pro-components';
import {
  Button,
  Row,
  Col,
  Space,
  Typography,
  Table,
  Select,
  DatePicker,
  Radio,
  Tabs,
  Spin,
  Empty,
  Divider
} from 'antd';
import {
  DownloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  CarOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const LogisticsReports = () => {
  const user = useSelector((state) => state.account.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState('shipment');
  
  // Example data
  const shipmentColumns = [
    {
      title: 'Mã VC',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Thời gian vận chuyển',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Chênh lệch nhiệt độ',
      dataIndex: 'tempDelta',
      key: 'tempDelta',
    },
    {
      title: 'Quãng đường',
      dataIndex: 'distance',
      key: 'distance',
    }
  ];

  const shipmentData = [
    {
      key: '1',
      id: 'L10058',
      productName: 'Cải bắp organic',
      startDate: '25/11/2023',
      endDate: '28/11/2023',
      duration: '3 ngày',
      tempDelta: '±2.3°C',
      distance: '320 km'
    },
    {
      key: '2',
      id: 'L10057',
      productName: 'Dưa lưới sạch',
      startDate: '23/11/2023',
      endDate: '25/11/2023',
      duration: '2 ngày',
      tempDelta: '±1.5°C',
      distance: '180 km'
    },
    {
      key: '3',
      id: 'L10056',
      productName: 'Cà chua hữu cơ',
      startDate: '20/11/2023',
      endDate: '22/11/2023',
      duration: '2 ngày',
      tempDelta: '±1.8°C',
      distance: '210 km'
    },
    {
      key: '4',
      id: 'L10055',
      productName: 'Bắp ngọt',
      startDate: '18/11/2023',
      endDate: '20/11/2023',
      duration: '2 ngày',
      tempDelta: '±2.1°C',
      distance: '250 km'
    },
    {
      key: '5',
      id: 'L10054',
      productName: 'Rau xà lách',
      startDate: '15/11/2023',
      endDate: '17/11/2023',
      duration: '2 ngày',
      tempDelta: '±1.2°C',
      distance: '150 km'
    }
  ];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  const handleExportExcel = () => {
    message.success('Xuất báo cáo Excel thành công!');
  };

  const handleExportPDF = () => {
    message.success('Xuất báo cáo PDF thành công!');
  };

  if (loading) {
    return (
      <PageContainer
        title="Báo cáo vận chuyển"
        loading={true}
      >
        <div style={{ display: 'flex', justifyContent: 'center', padding: 100 }}>
          <Spin size="large" />
        </div>
      </PageContainer>
    );
  }

  const tabItems = [
    {
      key: 'shipment',
      label: (
        <span>
          <CarOutlined />
          Vận chuyển
        </span>
      ),
      children: (
        <Table
          columns={shipmentColumns}
          dataSource={shipmentData}
          bordered
        />
      ),
    },
    {
      key: 'temperature',
      label: (
        <span>
          <LineChartOutlined />
          Nhiệt độ
        </span>
      ),
      children: (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 100, background: '#f5f5f5', borderRadius: 8 }}>
          <Empty description="Dữ liệu biểu đồ nhiệt độ sẽ được hiển thị ở đây" />
        </div>
      ),
    },
    {
      key: 'destinations',
      label: (
        <span>
          <EnvironmentOutlined />
          Điểm đến
        </span>
      ),
      children: (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 100, background: '#f5f5f5', borderRadius: 8 }}>
          <Empty description="Thống kê điểm đến sẽ được hiển thị ở đây" />
        </div>
      ),
    },
    {
      key: 'drivers',
      label: (
        <span>
          <TeamOutlined />
          Đội ngũ vận chuyển
        </span>
      ),
      children: (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 100, background: '#f5f5f5', borderRadius: 8 }}>
          <Empty description="Báo cáo về đội ngũ vận chuyển sẽ được hiển thị ở đây" />
        </div>
      ),
    },
  ];

  return (
    <PageContainer
      title="Báo cáo vận chuyển"
      subTitle="Thống kê và phân tích dữ liệu vận chuyển"
    >
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <ProCard>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Row gutter={24} align="middle">
                <Col xs={24} sm={8} md={6} lg={4}>
                  <Text strong>Khoảng thời gian:</Text>
                </Col>
                <Col xs={24} sm={16} md={18} lg={20}>
                  <Space>
                    <RangePicker />
                    <Radio.Group defaultValue="week">
                      <Radio.Button value="week">Tuần</Radio.Button>
                      <Radio.Button value="month">Tháng</Radio.Button>
                      <Radio.Button value="quarter">Quý</Radio.Button>
                      <Radio.Button value="year">Năm</Radio.Button>
                    </Radio.Group>
                  </Space>
                </Col>
              </Row>
              
              <Row gutter={24} align="middle" style={{ marginTop: 16 }}>
                <Col xs={24} sm={8} md={6} lg={4}>
                  <Text strong>Loại sản phẩm:</Text>
                </Col>
                <Col xs={24} sm={16} md={18} lg={20}>
                  <Select 
                    defaultValue="all"
                    style={{ width: 200 }}
                  >
                    <Option value="all">Tất cả</Option>
                    <Option value="vegetable">Rau củ</Option>
                    <Option value="fruit">Trái cây</Option>
                    <Option value="grain">Ngũ cốc</Option>
                    <Option value="meat">Thịt</Option>
                  </Select>
                </Col>
              </Row>
            </Space>
          </ProCard>
        </Col>

        <Col span={24}>
          <ProCard
            headerBordered
            tabs={{
              activeKey: reportType,
              onChange: setReportType,
              items: tabItems,
            }}
            extra={
              <Space>
                <Button icon={<FileExcelOutlined />} onClick={handleExportExcel}>
                  Xuất Excel
                </Button>
                <Button icon={<FilePdfOutlined />} onClick={handleExportPDF}>
                  Xuất PDF
                </Button>
              </Space>
            }
          />
        </Col>

        <Col span={24}>
          <ProCard title="Thống kê theo thời gian" headerBordered>
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={8}>
                <ProCard title="Thời gian vận chuyển trung bình" bordered>
                  <div style={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5', borderRadius: 8 }}>
                    <Empty description="Biểu đồ sẽ được hiển thị ở đây" />
                  </div>
                </ProCard>
              </Col>
              
              <Col xs={24} lg={8}>
                <ProCard title="Số lượng chuyến theo tháng" bordered>
                  <div style={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5', borderRadius: 8 }}>
                    <Empty description="Biểu đồ sẽ được hiển thị ở đây" />
                  </div>
                </ProCard>
              </Col>
              
              <Col xs={24} lg={8}>
                <ProCard title="Tỷ lệ giao hàng đúng hạn" bordered>
                  <div style={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5', borderRadius: 8 }}>
                    <Empty description="Biểu đồ sẽ được hiển thị ở đây" />
                  </div>
                </ProCard>
              </Col>
            </Row>
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default LogisticsReports;
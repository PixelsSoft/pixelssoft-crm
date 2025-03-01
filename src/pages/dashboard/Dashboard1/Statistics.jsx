import React from "react";
import { Row, Col } from "react-bootstrap";

// componets
import StatisticsWidget from "../../../components/StatisticsWidget";




const Statistics = (props) => {
  const {data}=props
  console.log({data})
  return (
    <>
      <Row>
        <Col md={6} xl={3}>
          <StatisticsWidget
            variant="primary"
            counterOptions={{
              prefix: "$",
            }}
            description="This Month sales"
            stats={data?.total_this_month_sales||0}
            icon="fe-heart"
          />
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidget
            variant="success"
            counterOptions={{
              prefix: "$",
            }}
            description="Today's Sales"
            stats={data?.today_sales||0}
            icon="fe-shopping-cart"
          />
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidget
            variant="info"
            description="Total Active Project"
            stats={data?.total_running_projects||0}
            counterOptions={{
              prefix:"🚀 ",
            }}
            icon="fe-bar-chart-line-"
          />
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidget
            variant="warning"
            description="Total Active User"
            counterOptions={{
              prefix:"👤 ",
            }}
            stats={data?.total_active_users||0}
            icon="fe-eye"
          />
        </Col>
      </Row>
    </>
  );
};

export default Statistics;

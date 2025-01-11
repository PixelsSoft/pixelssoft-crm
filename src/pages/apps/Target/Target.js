import { Card, Col, Row } from 'react-bootstrap'
import PageTitle from '../../../components/PageTitle'
import CountUp from "react-countup";
import StatisticsWidget2 from '../../../components/StatisticsWidget2'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { GetTargets } from '../../../redux/Slices/Target/target';
import Spinner from '../../../components/Spinner';

export default function Target() {
    const [data,setData]=useState([])
      const [loading, setLoading] = useState(false);
    
    const dispatch=useDispatch()
        const { token, } = useSelector(
            ( state ) => ( {
                token: state.Auth.token,
               
            } )
        );
    const getTargetByAPiCall=async()=>{
    setLoading(true)

        try {
            const response=await dispatch(GetTargets(token))
            setData(response)
        setLoading(false)
            
         
        } catch (error) {
            console.log(error)
        setLoading(false)
    }
    }
    useEffect(() => {
        getTargetByAPiCall()
    }, [])
    
    return loading?(
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ): (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Target", path: "/apps/target/" },

                ]}
                title={"Target"}
            />
            <Row>
                <Col>
                    <Card className="widget-inline">
                        <Card.Body>
                            <Row>
                                <Col sm={6} xl={3}>
                                    <div className="p-2 text-center">
                                        <i className="mdi mdi-currency-usd text-success mdi-24px"></i>
                                        <h3>
                                            $
                                            <span>
                                                <CountUp duration={1} end={7841} />
                                            </span>
                                        </h3>
                                        <p className="text-muted font-15 mb-0">Company target</p>
                                    </div>
                                </Col>
                                <Col sm={6} xl={3}>
                                    <div className="p-2 text-center">
                                        <i className="mdi mdi-cash-lock text-primary mdi-24px"></i>
                                        <h3>
                                            $
                                            <span>
                                                <CountUp duration={1} end={7841} />
                                            </span>
                                        </h3>
                                        <p className="text-muted font-15 mb-0">Achieve target</p>
                                    </div>
                                </Col>
                                <Col sm={6} xl={3}>
                                    <div className="p-2 text-center">
                                        <i className="mdi mdi-cash-plus text-danger mdi-24px"></i>
                                        <h3>
                                            $
                                            <span>
                                                <CountUp duration={1} end={7841} />
                                            </span>
                                        </h3>
                                        <p className="text-muted font-15 mb-0">Release Amount</p>
                                    </div>
                                </Col>
                                <Col sm={6} xl={3}>
                                    <div className="p-2 text-center">
                                        <i className="mdi mdi-cash-remove text-blue mdi-24px"></i>
                                        <h3>
                                            $
                                            <span>
                                                <CountUp duration={1} end={7841} />
                                            </span>
                                        </h3>
                                        <p className="text-muted font-15 mb-0">Pending</p>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
    {(data || []).map((item, index) => {
        return (
            <Col key={index} lg={3} md={4} sm={6} xs={12} className="mb-3">
                <Link to={`/apps/target/${item?.user_id}`}>
                    <StatisticsWidget2
                        variant="blue"
                        description={item?.name}
                        stats={item?.monthly_sales[item?.monthly_sales.length - 1]?.target}
                        icon="fe-aperture"
                        progress={
                            item?.monthly_sales[item?.monthly_sales.length - 1]?.target === 0
                                ? 0
                                : (item?.monthly_sales[item?.monthly_sales.length - 1]?.total_achieved /
                                  item?.monthly_sales[item?.monthly_sales.length - 1]?.target) *
                                  100
                        }
                        counterOptions={{
                            prefix: "$",
                        }}
                    />
                </Link>
            </Col>
        );
    })}
</Row>

           
        </>

    )
}

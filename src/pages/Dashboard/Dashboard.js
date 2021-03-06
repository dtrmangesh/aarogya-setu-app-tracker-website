import React, { Component } from 'react';
import Cards from '../../components/Card/Cards';
import EmployeeTable from '../../components/Table/EmployeeTable';
import './Dashboard.css';
import Header from '../../components/Header/Header';
import AddEmployees from '../AddEmployees/AddEmployees'
import FloatingButton from '../FloatingButton/FloatingButton';
import OfficeSeats from '../OfficeSeats/OfficeSeats'

export default class Dashboard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      show: false,
      active: 'allEmp',
      uploadRecord: false,
      queryResult: '',
      homePage:true
    };
    this.showModal = this.showModal.bind(this)
    this.uploadExcelsheet = this.uploadExcelsheet.bind(this);
  }
   showModal() {
    this.setState({ show: true });
        
  }
    
  hideModal = () => {
    this.setState({
      show: false,
      uploadRecord: false});
  };
   
  uploadExcelsheet() {
    this.showModal();
    this.setState({
      uploadRecord: true,
    })
  }


  toggle(val){
    if (this.state.active === val) {
      this.setState({active : null})
    } else {
      this.setState({active : val})
    }
  }
  
  boxColor(val) {
    if (this.state.active === val) {
      return "white";
    }
    return "";
  }

  textColor(val) {
    if (this.state.active === val) {
      return "#009fd5";
    }
    return "#8f8d8d";
  }

  setSearchQuery = (queryRes ) => {
  this.setState({
    queryResult: queryRes,
  })
  }

  showHomePage = () => {
    this.setState({
      homePage:true
    })
  }

  showSeatsAllocation = () => {
    this.setState({
      homePage:false
    })
  }

  onLogout = () => {
    this.props.history.push("/");
  }
 
    render() {
        let opacity = this.state.show ? "blackButton" : "whiteButton";
        return (
            <div>
                <div className={opacity}>
              <Header searchHandler={this.setSearchQuery} 
              show={this.state.show} 
              gotoHome={this.showHomePage} 
              gotoSeatAvailability={this.showSeatsAllocation}
              logoutHandler={this.onLogout}/>
                </div>
            {/* eslint-disable-next-line */}
            <div>
              {this.state.homePage ? 
             <div>
             <div>
               <div className="addEmployeeContainer">
                 <FloatingButton openEmployeeModal={this.showModal} openUploadRecord={this.uploadExcelsheet}/>
                 </div>
               </div>
                 <div className="header"  className={opacity}>
                     <Cards />
                 </div>
                 <div className={opacity}  >
                 <div className="tableContainer">
                 <div className="box-container">
                 <div className="box" style={{background: this.boxColor('allEmp'), color: this.textColor('allEmp')}} onClick={() => {this.toggle('allEmp')}} >
                     <div className='box-heading'>All Employees</div>
                 </div>
                 <div className="box" style={{background: this.boxColor('activeEmp'), color: this.textColor('activeEmp')}} onClick={() => {this.toggle('activeEmp')}} >
                     <div className='box-heading'>Active Employees</div>
                 </div>
                 <div className="box" style={{background: this.boxColor('inActiveEmp'), color: this.textColor('inActiveEmp')}} onClick={() => {this.toggle('inActiveEmp')}}>
                     <div className='box-heading'>In-Active Employees</div>
                 </div>
                 </div>
                     <EmployeeTable empRes={this.state.queryResult} refreshData={this.state.show} activeTab={this.state.active}/>
                 </div>
                 </div>
                 <div>
                     {this.state.show ? <AddEmployees uploadRecord={this.state.uploadRecord} handleClose={this.hideModal}/> : null}
               </div>
                </div> :
                <div >
                 <OfficeSeats/>
                </div>}

            </div>
           
            </div>
        )
    }
}

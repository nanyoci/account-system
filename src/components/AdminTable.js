import React, { Component } from 'react';
import MaterialTable from 'material-table';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers, deleteUser, updateUser, createUser } from '../actions/adminActions';
import AdminBar from './AdminBar';

class AdminTable extends Component{

    componentWillMount() {
      //check condition if user has logged in
        // if(!this.props.isLoggedIn){
        //   this.props.history.push('/login');
        // }
        if(!localStorage.getItem('access_token')){
          this.props.history.push('/');
        }
        this.props.fetchUsers();
      }
    
      componentWillReceiveProps(nextProps) {
        if(!localStorage.getItem('access_token')){
          this.props.history.push('/');
        }
        /*if (nextProps.newUser) {
          this.props.users.unshift(nextProps.newUser.data);
        }*/
      }

    render(){return (
      <div>
      <AdminBar/>
      <MaterialTable
      title="Welcome Admin"
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Email', field: 'email'},
          { title: 'Role', field: 'role'},
          { title: 'Password', field: 'pass'}
        ]}
        data    = {this.props.users}
        options={{
        }}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              let initialLen = this.props.users.length
              this.props.createUser(newData)
              setTimeout(() => {
                  if(initialLen === this.props.users.length){
                    alert("User not added!")
                    reject()
                  }
                  else{
                    let data = this.props.users;
                    this.setState({ data }, () => resolve())
                    alert("User added!")
                  }
                resolve()
              }, 2000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              this.props.updateUser(newData)
              resolve()
            }),
          onRowDelete: oldData =>
          new Promise((resolve, reject) => {
              this.props.deleteUser(oldData)
              console.log("finish")
              resolve()
            }),
        }}
      />
      </div>
    )}
  }

  AdminTable.propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    newUser: PropTypes.object
  };
  
  const mapStateToProps = state => ({
    users: state.adminReducer.items,
    newUser: state.adminReducer.item,
    isLoggedIn: state.authReducer.loginSuccess
  });
  
  export default withRouter(connect(mapStateToProps, { fetchUsers, createUser, deleteUser, updateUser })(AdminTable));
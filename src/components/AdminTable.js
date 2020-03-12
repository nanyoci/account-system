import React, { Component } from 'react';
import MaterialTable from 'material-table';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers, deleteUser, updateUser, createUser } from '../actions/adminActions';

class AdminTable extends Component{

    componentWillMount() {
        this.props.fetchUsers();
      }
    
      componentWillReceiveProps(nextProps) {
        console.log(nextProps.users)
        /*if (nextProps.newUser) {
          this.props.users.unshift(nextProps.newUser.data);
        }*/
      }

    render(){return (
      <MaterialTable
      title="Welcome Admin"
        columns={[
          { title: 'ID', field: 'id' , type: 'numeric', editable: 'never' },
          { title: 'First Name', field: 'first_name' },
          { title: 'Last Name', field: 'last_name'},
          { title: 'Email', field: 'email'},
          { title: 'Avatar', field: 'avatar'}
        ]}
        data    = {this.props.users}
        options={{
          rowStyle:{ justifyContent: 'flex-start', textAlign: 'justify' } ,
          actionsColumnIndex: -1
        }}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              let initialLen = this.props.users.length
              this.props.createUser(newData)
              setTimeout(() => {
                {
                  if(initialLen === this.props.users.length){
                    alert("User not added!")
                    reject()
                  }
                  else{
                    let data = this.props.users;
                    this.setState({ data }, () => resolve())
                    alert("User added!")
                  }
                }
                resolve()
              }, 2000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              this.props.updateUser(newData)
              resolve()
              // setTimeout(() => {
              //   {
              //     const data = this.props.data;
              //     this.setState({ data }, () => resolve());
              //   }
              //   resolve()
              // }, 2000)
            }),
          onRowDelete: oldData =>
          new Promise((resolve, reject) => {
              let initialLen = this.props.users.length 
              this.props.deleteUser(oldData)
              console.log("finish")
              resolve()
              // setTimeout(() => {
              //   if(initialLen === this.props.users.length){
              //     reject()
              //   }
              //   else{
              //     let data = this.props.users;
              //     this.setState({ data }, () => resolve());
              //   }
              // },2000)
            }),
        }}
      />
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
    newUser: state.adminReducer.item
  });
  
  export default withRouter(connect(mapStateToProps, { fetchUsers, createUser, deleteUser, updateUser })(AdminTable));
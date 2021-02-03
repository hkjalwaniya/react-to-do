import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles, Grid } from '@material-ui/core'
import DialogContentText from '@material-ui/core/DialogContentText';

import styles from './styles'
import Bucket from '../../components/blocks/Bucket'
import TasksModal from '../../components/atoms/TasksModal'
import TasksTextField from '../../components/atoms/TasksTextField'
import TasksSnackBar from '../../components/atoms/TasksSnackBar'

class Tasks extends Component {
  constructor(props){
    super(props)
    this.state = {
      buckets: [
        {
          "name": "bucket1",
          "tasks": [
            {
              "name": "task1",
              "isCompleted": false
            },
            {
              "name": "task2",
              "isCompleted": true
            },
            {
              "name": "task3",
              "isCompleted": false
            }
          ]
        },
        {
          "name": "bucket2",
          "tasks": [
            {
              "name": "task1",
              "isCompleted": true
            },
            {
              "name": "task2",
              "isCompleted": false
            },
            {
              "name": "task3",
              "isCompleted": true
            }
          ]
        },
        {
          "name": "bucket3",
          "tasks": [
            {
              "name": "task1",
              "isCompleted": true
            },
            {
              "name": "task2",
              "isCompleted": false
            },
            {
              "name": "task3",
              "isCompleted": true
            }
          ]
        },
        {
          "name": "bucket4",
          "tasks": [
            {
              "name": "task1",
              "isCompleted": false
            },
            {
              "name": "task2",
              "isCompleted": true
            },
            {
              "name": "task3",
              "isCompleted": false
            }
          ]
        },
        {
          "name": "bucket5",
          "tasks": [
            {
              "name": "task1",
              "isCompleted": true
            },
            {
              "name": "task2",
              "isCompleted": true
            },
            {
              "name": "task3",
              "isCompleted": true
            },
            {
              "name": "task4",
              "isCompleted": false
            }
          ]
        }
      ],
      openAddTaskModal: false,
      currentBucket: '',
      openRenameBucketModal: false,
      newTaskName: '',
      newBucketName: '',
      bucketExistsError: false,
      taskExistsError: false
    }
  }
  render() {
    const { user, classes } = this.props
    const { buckets,
      openAddTaskModal,
      openRenameBucketModal,
      currentBucket,
      newTaskName,
      bucketExistsError,
      taskExistsError
    } = this.state

    const handleModalOpen = (bucketName, modalType) => {
      const isAddTaskModal = modalType === 'addTask' ? true : false;
      const isEditBucket = modalType === 'editBucket' ? true : false;

      this.setState({
        openAddTaskModal: isAddTaskModal,
        currentBucket: bucketName,
        openRenameBucketModal: isEditBucket
      })
    }

    const handleModalClose = () => {
      this.setState({
        openAddTaskModal: false,
        currentBucket: '',
        openRenameBucketModal: false,
        bucketExistsError: false,
        taskExistsError: false
      })
    }

    const handleBucketChange = (bucketName, taskName) => {
      const { buckets } = this.state
      const bucketIndex = buckets.findIndex((bucket) => {
        return bucket.name === bucketName
      })
      if(bucketIndex > -1) {
        const taskIndex = buckets[bucketIndex].['tasks'].findIndex((task) => {
          return task.name === taskName
        })
        if(taskIndex > -1) {
          const status = buckets[bucketIndex]['tasks'][taskIndex]['isCompleted']
          buckets[bucketIndex]['tasks'][taskIndex]['isCompleted'] = !status
          this.setState({buckets})
        }
      }
    }

    const handleAddTask = () => {
      const { newTaskName, currentBucket, buckets } = this.state
      const newTask = {
        name: newTaskName,
        isCompleted: false
      }
      const bucketIndex = buckets.findIndex((bucket) => {
        return bucket.name === currentBucket
      })

      if(bucketIndex > -1) {
        const taskExists = buckets[bucketIndex]['tasks'].some((task) => {
          return task.name === newTaskName
        })
        if(!taskExists) {
          buckets[bucketIndex]['tasks'].push(newTask)
          this.setState({
            buckets,
            openAddTaskModal: false,
            currentBucket: '',
            openRenameBucketModal: false,
            bucketExistsError: false,
            taskExistsError: false
          })
        } else {
          this.setState({taskExistsError: true})
        }
      } else {
        return false
      }
    }

    const handleRenameBucket = () => {
      const { newBucketName, currentBucket, buckets } = this.state
      const bucketAlreadyExist = buckets.some((bucket) => {
        return bucket.name === newBucketName
      })
      if(!bucketAlreadyExist) {
        const bucketIndex = buckets.findIndex((bucket) => {
          return bucket.name === currentBucket
        })

        if(bucketIndex > -1) {
          buckets[bucketIndex]['name'] = newBucketName
          this.setState({
            buckets,
            openAddTaskModal: false,
            currentBucket: '',
            openRenameBucketModal: false,
            bucketExistsError: false,
            taskExistsError: false
          })
        } else {
          return false
        }
      } else {
        this.setState({bucketExistsError: true})
      }
    }

    const handleRenameChange = (e) => {
      const { value } = e.target
      this.setState({ newBucketName: value})
    }

    const handleNewTaskName = (e) => {
      const { value } = e.target
      this.setState({ newTaskName: value})
    }

    const addNewBucket = (bucketName) => {
      const { buckets } = this.state
      const bucketsCount = buckets.length;
      const bucketAlreadyExist = buckets.some((bucket) => {
        return bucket.name === bucketName
      })
      if(!bucketAlreadyExist) {
        const newBucketObject = {
          name: bucketName,
          tasks: []
        }
        buckets.splice(bucketsCount, 0, newBucketObject)
        this.setState({buckets})
      } else {
        this.setState({bucketExistsError: true})
      }
    }

    return (
      <>
        <section className={classes.tasksWrapper}>
          <h1>
            Hello {user.firstName} {user.lastName}, Welcome to tasks!!
          </h1>
          <Grid container spacing={3} className={classes.bucketWrapper}>
            {
              bucketExistsError && <TasksSnackBar
                isOpen={true}
                severity="error"
                message={`Bucket with this name already exists`}
              />
            }
            {
              taskExistsError && <TasksSnackBar
                isOpen={true}
                severity="error"
                message={`Task with this name already exists in the bucket`}
              />
            }
            {buckets && buckets.map((bucket, index) => (
              <Bucket name={bucket.name}
                tasks={bucket.tasks}
                key={index}
                handleModalOpen={handleModalOpen}
                handleBucketChange={handleBucketChange}
              />
            ))}
          </Grid>
          {
            openAddTaskModal &&
            <TasksModal
              handleModalClose={handleModalClose}
              modalTitle={`Add task to ${currentBucket}`}
              handleActionSuccess={handleAddTask}
            >
             <DialogContentText>
               This task will be added in bucket with todo status
             </DialogContentText>
             <TasksTextField
               autoFocus
               margin="dense"
               id="task"
               label="Task Name"
               type="text"
               fullWidth
               onChange={(e) => handleNewTaskName(e)}
             />
            </TasksModal>
          }
          {
            openRenameBucketModal &&
            <TasksModal
              handleModalClose={handleModalClose}
              modalTitle={`Rename ${currentBucket}`}
              handleActionSuccess={handleRenameBucket}
            >
             <DialogContentText>
               This name will be replace the existing bucket name
             </DialogContentText>
             <TasksTextField
               autoFocus
               margin="dense"
               id="task"
               label="New Bucket Name"
               type="text"
               fullWidth
               onChange={handleRenameChange}
             />
            </TasksModal>
          }
        </section>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state.user
  return {
    user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Tasks))

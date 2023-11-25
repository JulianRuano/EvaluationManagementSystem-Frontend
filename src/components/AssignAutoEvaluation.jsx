import React, { useState } from 'react'
import AssignAutoEvaluationModal from './AssignAutoEvaluationModal'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { startHandleLogout } from './actions/auth'
import { assignAutoEvaluationFunction } from '../hooks/mutations/useAssignAutoEvaluation'
import propTypes from 'prop-types'
import { useParams } from 'react-router-dom'

const AssignAutoEvaluation = ({
  isAssignAutoEvalModalOpen,
  setIsAssignAutoEvalModalOpen
}) => {
  const dispatch = useDispatch()
  const notifySuccess = (message) =>
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: false
    })
  const { id: docentId } = useParams()
  const docentLabours = useSelector((state) =>
    state.educators.educators
      .filter((educator) => educator.uid === docentId)
      .map((educator) => educator.labours)
  )

  const notifyError = (message) =>
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: false
    })

  const showModal = () => {
    setIsAssignAutoEvalModalOpen(true)
  }

  const handleOk = () => {
    setIsAssignAutoEvalModalOpen(false)
  }

  const handleCancel = () => {
    setIsAssignAutoEvalModalOpen(false)
  }
  const assignAutoEvalMutation = useMutation({
    mutationFn: assignAutoEvaluationFunction,
    onSuccess: (data) => {
      setIsAssignAutoEvalModalOpen(false)
      notifySuccess('Docente creado con éxito')
    },
    onError: async (error) => {
      if (error?.response?.status === 401) {
        await dispatch(startHandleLogout())
        return
      }
      console.log(error)
      notifyError(error.response.data.message)
    }
  })
  const handleAssignAutoEval = (values, actions) => {
    assignAutoEvalMutation.mutate(values)
  }

  return (
    <div>
      <AssignAutoEvaluationModal
        isModalOpen={isAssignAutoEvalModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        handleAssignAutoEval={handleAssignAutoEval}
        assignAutoEvalMutation={assignAutoEvalMutation}
        docentLabours={docentLabours}
      />
    </div>
  )
}

export default AssignAutoEvaluation

AssignAutoEvaluation.propTypes = {
  isAssignAutoEvalModalOpen: propTypes.bool.isRequired,
  setIsAssignAutoEvalModalOpen: propTypes.func.isRequired
}
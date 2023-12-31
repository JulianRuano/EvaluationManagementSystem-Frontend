import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Modal, Skeleton } from 'antd'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { labourSchema } from '../helpers/formikSchemas/labourSchema'
import { LoadingOutlined } from '@ant-design/icons'

const EditLabourModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  handleUpdateLabourMutation,
  labourUpdateMutation,
  labourTypesLoading,
  labourTypesError
}) => {
  const id = useSelector((state) => state.labours.labourTypeUidToEdit)
  const labour = useSelector((state) =>
    state.labours.labours.find((labour) => labour.uid === id)
  )
  const labourTypeData = useSelector((state) => state.labours.labourTypes)

  if (labourTypesLoading)
    return (
      <div className="px-5 py-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i}>
            <Skeleton active />
            <br />
          </div>
        ))}
      </div>
    )
  if (labourTypesError) return <p>Ha ocurrido un error</p>

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{
        hidden: true
      }}
      cancelButtonProps={{
        hidden: true
      }}
      width={800}
      centered={true}
    >
      <Formik
        initialValues={{
          nameWork: labour.nameWork,
          labourType: {
            idLabourType: labour.labourType.idLabourType,
            code: labour.labourType.code,
            description: labour.labourType.description,
            labourTypeUid: labour.labourType.uid
          },
          assignedHours: labour.assignedHours,
          isActive: labour.isActive
        }}
        validationSchema={labourSchema}
        onSubmit={handleUpdateLabourMutation}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className=" space-y-6">
            <div className="text-center">
              <h1 className="font-bold text-2xl text-stone-700">
                Actualizar labor
              </h1>
              <p>A continuacion ingrese los datos de la labor</p>
            </div>
            <div>
              <div className="flex flex-wrap -mx-3">
                <div className="sm:w-1/2 w-full px-3 mb-2">
                  <label
                    htmlFor="firstName"
                    className="text-xs font-semibold px-1"
                  >
                    Nombre de la labor
                  </label>
                  <div className="flex flex-col">
                    <Field
                      type="text"
                      id="nameWork"
                      name="nameWork"
                      className="w-full  pl-3 pr-3 py-0.5  rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="Labor"
                    />
                    <ErrorMessage
                      className="text-red-600 text-sm  py-1"
                      name="nameWork"
                      component="div"
                    />
                  </div>
                </div>
                <Field
                  type="hidden"
                  id="labourTypeUid"
                  name="labourType.labourTypeUid"
                />

                <div className="sm:w-1/2 w-full px-3 mb-2">
                  <label htmlFor="lastName" className="text-xs font-semibold">
                    Horas asignadas
                  </label>
                  <div className="flex flex-col">
                    <Field
                      type="text"
                      id="assignedHours"
                      name="assignedHours"
                      disabled
                      className="w-full pl-3 pr-3 py-0.5  rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="35"
                      onChange={(event) => {
                        const value = event.target.value
                        if (value === '') {
                          setFieldValue('assignedHours', null)
                        } else {
                          const intValue = parseInt(value, 10)
                          if (!isNaN(intValue)) {
                            setFieldValue('assignedHours', intValue)
                          }
                        }
                      }}
                    />
                    <ErrorMessage
                      className="text-red-600 text-sm py-1 "
                      name="assignedHours"
                      component="div"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="sm:w-1/2 w-full px-3 mb-2">
                  <label htmlFor="role" className="text-xs font-semibold px-1">
                    Descripción
                  </label>
                  <div className="flex flex-col">
                    <Field
                      as="select"
                      id="labour"
                      name="labourType.description"
                      className="w-full pl-3 pr-3 py-0.5 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      onChange={(event) => {
                        const value = event.target.value
                        if (value === '') {
                          setFieldValue('labourType.description', '')
                          setFieldValue('labourType.code', '')
                          setFieldValue('labourType.labourTypeUid', '')
                          setFieldValue('labourType.idLabourType', '')
                        } else {
                          const selectedLabourType = labourTypeData.find(
                            (labourType) => labourType.description === value
                          )
                          setFieldValue(
                            'labourType.description',
                            selectedLabourType.description
                          )
                          setFieldValue(
                            'labourType.code',
                            selectedLabourType.code
                          )
                          setFieldValue(
                            'labourType.labourTypeUid',
                            selectedLabourType.uid
                          )
                          setFieldValue(
                            'labourType.idLabourType',
                            selectedLabourType.idLabourType
                          )
                        }
                      }}
                    >
                      <option value="">Elige una labor</option>
                      {labourTypeData.map((labourType) => (
                        <option
                          key={labourType.idlabor}
                          value={labourType.description}
                        >
                          {labourType.description}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      className="text-red-600 text-sm py-1"
                      name="labourType.description"
                      component="div"
                    />
                  </div>
                </div>
                <div className="sm:w-1/2 w-full px-3 mb-2">
                  <label htmlFor="title" className="text-xs font-semibold px-1">
                    Código
                  </label>
                  <div className="flex flex-col">
                    <Field
                      type="text"
                      id="codigo"
                      name="labourType.code"
                      disabled
                      className="w-full pl-3 pr-3 py-0.5 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="sm:w-1/2 w-full px-3 mb-2">
                  <label htmlFor="id" className="text-xs font-semibold px-1">
                    ID
                  </label>
                  <div className="flex flex-col">
                    <Field
                      type="text"
                      id="idlabor"
                      name="labourType.idLabourType"
                      disabled
                      className="w-full pl-3 pr-3 py-0.5 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="sm:w-1/2 w-full px-3 mb-2">
                  <label
                    htmlFor="idType"
                    className="text-xs font-semibold px-1"
                  >
                    Activa
                  </label>
                  <div className="flex flex-col">
                    <Field
                      as="select"
                      id="isActive"
                      name="isActive"
                      className="w-full  pl-3 pr-3 py-0.5  rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      onChange={(event) => {
                        const value = event.target.value
                        if (value === '') {
                          setFieldValue('isActive', '') // Cambia null a "" o undefined
                        } else {
                          const booleanValue = value === 'true'
                          setFieldValue('isActive', booleanValue)
                        }
                      }}
                    >
                      <option value="">Elige una opción</option>
                      <option value="true">Si</option>
                      <option value="false">No</option>
                    </Field>

                    <ErrorMessage
                      className="text-red-600 text-sm pt-1"
                      name="isActive"
                      component="div"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full gap-3 mt-2 flex">
                <button
                  type="reset"
                  className={`block w-1/2 mx-auto  bg-red-400 hover:bg-red-500 text-white rounded-lg py-2  font-semibold `}
                  onClick={() => handleCancel()}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={labourUpdateMutation.isPending}
                  className={`block w-1/2 mx-auto  bg-indigo-500 hover:bg-indigo-700  text-white rounded-lg py-2  font-semibold ${
                    labourUpdateMutation.isPending ? 'opacity-50' : ''
                  }`}
                >
                  {labourUpdateMutation.isPending ? (
                    <p>
                      Guardando <LoadingOutlined />
                    </p>
                  ) : (
                    'Guardar'
                  )}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default EditLabourModal

EditLabourModal.propTypes = {
  isModalOpen: propTypes.bool.isRequired,
  handleOk: propTypes.func.isRequired,
  handleCancel: propTypes.func.isRequired,
  labourId: propTypes.string.isRequired,
  handleUpdateLabourMutation: propTypes.func.isRequired,
  labourUpdateMutation: propTypes.object.isRequired,
  labourTypesLoading: propTypes.bool.isRequired,
  labourTypesError: propTypes.bool.isRequired
}

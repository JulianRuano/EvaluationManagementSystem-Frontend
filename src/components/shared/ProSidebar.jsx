import React from 'react'
import { Sidebar } from 'react-pro-sidebar'
import propTypes from 'prop-types'

import {
  BookOutlined,
  AuditOutlined,
  SettingOutlined,
  TeamOutlined,
  InsertRowBelowOutlined,
  SnippetsOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProSidebar = ({ toggled, setToggled }) => {
  const role = useSelector((state) => state.auth.user.role)
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type
    }
  }
  const items = [
    getItem(
      'Menú',
      'grp',
      null,
      [
        ...(role === 'Coordinador' || role === 'Decano'
          ? [
              getItem(
                <NavLink to="docentes" onClick={() => setToggled(false)}>
                  Docentes
                </NavLink>,
                '13',
                <TeamOutlined />
              ),
              {
                type: 'divider'
              }
            ]
          : []),
        ...(role === 'Docente'
          ? [
              getItem(
                <NavLink
                  to="autoevaluaciones"
                  onClick={() => setToggled(false)}
                >
                  Autoevaluaciones
                </NavLink>,
                '14',
                <AuditOutlined />
              )
            ]
          : []),
        ...(role === 'Coordinador'
          ? [
              getItem(
                <NavLink
                  to="autoevaluaciones"
                  onClick={() => setToggled(false)}
                >
                  Autoevaluaciones
                </NavLink>,
                '15',
                <AuditOutlined />
              )
            ]
          : []),
        ...(role === 'Coordinador'
          ? [
              {
                type: 'divider'
              },
              getItem(
                <NavLink to="labores" onClick={() => setToggled(false)}>
                  Labores
                </NavLink>,
                '16',
                <BookOutlined />
              ),
              {
                type: 'divider'
              }
            ]
          : []),
        ...(role === 'Coordinador'
          ? [
              getItem(
                <NavLink to="periodos" onClick={() => setToggled(false)}>
                  Periodo académico
                </NavLink>,
                '17',
                <InsertRowBelowOutlined />
              ),
              {
                type: 'divider'
              }
            ]
          : []),
        ...(role === 'Decano'
          ? [
              getItem(
                <NavLink to="reportes" onClick={() => setToggled(false)}>
                  Reportes
                </NavLink>,
                '18',
                <SnippetsOutlined />
              ),
              {
                type: 'divider'
              }
            ]
          : [])
      ].flat(),
      'group'
    )
  ].filter((item) => item !== null && item !== false)

  // Si el rol es 'admin', añadir opciones de administrador

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        minHeight: 'calc(100vh - 68px)'
      }}
    >
      <Sidebar
        backgroundColor="#FFFFFF"
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="lg"
        rootStyles={{
          color: 'white'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px'
          }}
        ></div>

        <Menu
          style={{
            width: 256,
            minHeight: '100vh'
          }}
          mode="inline"
          items={items}
        />
      </Sidebar>
    </div>
  )
}
export default ProSidebar
ProSidebar.propTypes = {
  toggled: propTypes.bool,
  setToggled: propTypes.func
}

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StudentList from './admin/StudentList';
import StudentForm from './admin/StudentForm';
import Login from './admin/Login';
import ProtectedRoute from './admin/ProtectedRoute';

/**
 * Panel de administración para manejar estudiantes:
 * - Login
 * - Listado de estudiantes
 * - Formulario para crear/editar
 */
export default function AdminPanel() {
  return (
    <Routes>
      {/* Ruta pública de login */}
      <Route path="login" element={<Login />} />

      {/* Redirigir /admin a /admin/students */}
      <Route
        path=""
        element={
          <ProtectedRoute>
            <Navigate to="students" replace />
          </ProtectedRoute>
        }
      />

      {/* Listado de estudiantes */}
      <Route
        path="students"
        element={
          <ProtectedRoute>
            <StudentList />
          </ProtectedRoute>
        }
      />

      {/* Crear nuevo estudiante */}
      <Route
        path="students/new"
        element={
          <ProtectedRoute>
            <StudentForm />
          </ProtectedRoute>
        }
      />

      {/* Editar estudiante existente */}
      <Route
        path="students/:id"
        element={
          <ProtectedRoute>
            <StudentForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

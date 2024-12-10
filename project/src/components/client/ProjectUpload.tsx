import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useClientStore } from '../../stores/clientStore';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function ProjectUpload() {
  const { getCurrentProject, fetchProjects } = useClientStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/client/login');
        return;
      }
      await fetchProjects();
    };
    
    checkAuth();
  }, [fetchProjects, navigate]);

  const currentProject = getCurrentProject();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!currentProject) return;

    for (const file of acceptedFiles) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${currentProject.id}/${fileName}`;

      try {
        const { error } = await supabase.storage
          .from('project-files')
          .upload(filePath, file);

        if (error) throw error;
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }, [currentProject]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'application/zip': [],
      'application/x-zip-compressed': [],
      'application/pdf': [],
    },
    disabled: !currentProject,
  });

  if (!currentProject) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Vous n'avez pas de projet actif. Veuillez contacter l'administrateur.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Projet: {currentProject.name}
      </h2>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-500'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-slate-400" />
        <p className="mt-4 text-slate-600">
          {isDragActive
            ? "Déposez les fichiers ici..."
            : "Glissez-déposez vos fichiers ici ou cliquez pour sélectionner"}
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Images, ZIP, et PDF acceptés
        </p>
      </div>

      {acceptedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <h3 className="font-medium text-slate-900 mb-4">Fichiers téléchargés</h3>
          <ul className="space-y-2">
            {acceptedFiles.map((file) => (
              <li
                key={file.name}
                className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
              >
                <span className="text-sm text-slate-600">{file.name}</span>
                <button className="text-red-500 hover:text-red-700">
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
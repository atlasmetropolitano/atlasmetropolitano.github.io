import os
import shutil
import tkinter as tk
from tkinter import filedialog, messagebox

# Función para manejar rutas largas en Windows
def ruta_larga(path):
    if os.name == 'nt':  # Si estamos en Windows
        prefix = "\\\\?\\"
        return prefix + os.path.abspath(path)
    return path

# Función para mover archivos sin importar la extensión
def mover_archivos():
    directorio = filedialog.askdirectory(title="Selecciona el directorio con los archivos")
    if not directorio:
        return

    for archivo in os.listdir(directorio):
        ruta_archivo = os.path.join(directorio, archivo)
        if os.path.isfile(ruta_archivo):
            # Usamos el nombre base del archivo sin importar la extensión
            nombre_carpeta = os.path.splitext(archivo)[0].split('.')[0]
            carpeta_destino = os.path.join(directorio, nombre_carpeta)

            # Crear la carpeta si no existe
            if not os.path.exists(carpeta_destino):
                os.makedirs(carpeta_destino)

            # Mover el archivo a la carpeta (usando la función para manejar rutas largas)
            try:
                shutil.move(ruta_larga(ruta_archivo), ruta_larga(os.path.join(carpeta_destino, archivo)))
            except FileNotFoundError as e:
                messagebox.showerror("Error", f"No se pudo mover el archivo {archivo}: {str(e)}")
                continue

    messagebox.showinfo("Completado", "Los archivos se han movido a sus carpetas correspondientes.")

# Configuración de la ventana principal
root = tk.Tk()
root.title("Mover Archivos a Carpetas")
root.geometry("400x200")

# Botón para seleccionar directorio y ejecutar la función
btn_mover = tk.Button(root, text="Seleccionar Directorio y Mover Archivos", command=mover_archivos)
btn_mover.pack(pady=50)

# Iniciar la aplicación
root.mainloop()


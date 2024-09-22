import os
import zipfile
from collections import defaultdict
from tkinter import Tk, Button, Label
from tkinter import filedialog
from tkinter import messagebox

# Variables globales para almacenar los directorios seleccionados
directorio_origen = None
directorio_destino = None

# Función para seleccionar el directorio de origen
def seleccionar_directorio_origen():
    global directorio_origen
    directorio_origen = filedialog.askdirectory()
    if directorio_origen:
        label_origen.config(text=f"Directorio de Origen: {directorio_origen}")
    else:
        label_origen.config(text="Directorio de Origen: No seleccionado")

# Función para seleccionar el directorio de destino
def seleccionar_directorio_destino():
    global directorio_destino
    directorio_destino = filedialog.askdirectory()
    if directorio_destino:
        label_destino.config(text=f"Directorio de Destino: {directorio_destino}")
    else:
        label_destino.config(text="Directorio de Destino: No seleccionado")

# Función para comprimir los archivos con nombres iguales
def comprimir_archivos():
    # Verificar que los directorios de origen y destino estén seleccionados
    if not directorio_origen or not directorio_destino:
        messagebox.showerror("Error", "Debe seleccionar ambos directorios (origen y destino)")
        return

    # Diccionario para agrupar archivos por nombre (sin extensión)
    archivos_por_nombre = defaultdict(list)

    # Recorrer el directorio de origen
    for carpeta, subcarpetas, archivos in os.walk(directorio_origen):
        for archivo in archivos:
            # Separar el nombre del archivo de su extensión
            nombre, extension = os.path.splitext(archivo)
            # Agregar el archivo a la lista correspondiente en el diccionario
            archivos_por_nombre[nombre].append(os.path.join(carpeta, archivo))

    # Contador de archivos ZIP creados
    contador_zip = 0

    # Crear un archivo ZIP para cada conjunto de archivos que tengan el mismo nombre
    for nombre_base, archivos in archivos_por_nombre.items():
        # Si hay más de un archivo con el mismo nombre (diferente extensión)
        if len(archivos) > 1:
            zip_filename = os.path.join(directorio_destino, f'{nombre_base}.zip')
            try:
                with zipfile.ZipFile(zip_filename, 'w') as zipf:
                    for archivo in archivos:
                        zipf.write(archivo, os.path.relpath(archivo, directorio_origen))
                contador_zip += 1  # Incrementar contador por cada ZIP creado
            except Exception as e:
                messagebox.showerror("Error", f"Ocurrió un error al crear el archivo {zip_filename}: {e}")
                return

    # Mostrar mensaje con el número de archivos ZIP creados
    if contador_zip > 0:
        messagebox.showinfo("Proceso completado", f"Se han creado {contador_zip} archivos ZIP con éxito.")
    else:
        messagebox.showinfo("Proceso completado", "No se encontraron archivos con el mismo nombre para comprimir.")

# Crear la ventana principal
ventana = Tk()
ventana.title("Comprimir Archivos con Nombres Iguales")
ventana.geometry("500x300")

# Etiquetas y botones
label_origen = Label(ventana, text="Directorio de Origen: No seleccionado")
label_origen.pack(pady=10)

boton_origen = Button(ventana, text="Seleccionar Directorio de Origen", command=seleccionar_directorio_origen)
boton_origen.pack(pady=10)

label_destino = Label(ventana, text="Directorio de Destino: No seleccionado")
label_destino.pack(pady=10)

boton_destino = Button(ventana, text="Seleccionar Directorio de Destino", command=seleccionar_directorio_destino)
boton_destino.pack(pady=10)

boton_comprimir = Button(ventana, text="Comprimir Archivos", command=comprimir_archivos)
boton_comprimir.pack(pady=20)

# Iniciar el loop de la interfaz gráfica
ventana.mainloop()





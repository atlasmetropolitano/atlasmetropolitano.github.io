import os
from osgeo import ogr
import tkinter as tk
from tkinter import filedialog, messagebox

class SHPtoGeoJSONConverter:
    def __init__(self, root):
        self.root = root
        self.root.title("SHP a GeoJSON Converter")
        self.root.geometry("400x200")

        # Variables para almacenar las rutas seleccionadas
        self.shp_dir = ""
        self.output_dir = ""

        # Etiqueta y botón para seleccionar el directorio de origen (SHP)
        tk.Label(root, text="Selecciona el directorio con archivos SHP").pack(pady=10)
        self.shp_button = tk.Button(root, text="Buscar Origen", command=self.browse_shp)
        self.shp_button.pack(pady=5)

        # Etiqueta y botón para seleccionar el directorio de destino (GeoJSON)
        tk.Label(root, text="Selecciona el directorio de destino").pack(pady=10)
        self.output_button = tk.Button(root, text="Buscar Destino", command=self.browse_output)
        self.output_button.pack(pady=5)

        # Botón para realizar la conversión
        self.convert_button = tk.Button(root, text="Convertir", command=self.convert_shp_to_geojson)
        self.convert_button.pack(pady=10)

        # Botón para salir de la aplicación
        self.exit_button = tk.Button(root, text="Salir", command=root.quit)
        self.exit_button.pack(pady=10)

    def browse_shp(self):
        # Seleccionar el directorio con los archivos SHP
        self.shp_dir = filedialog.askdirectory()
        if self.shp_dir:
            messagebox.showinfo("Directorio seleccionado", f"Directorio SHP seleccionado: {self.shp_dir}")
    
    def browse_output(self):
        # Seleccionar el directorio donde guardar los GeoJSON
        self.output_dir = filedialog.askdirectory()
        if self.output_dir:
            messagebox.showinfo("Directorio seleccionado", f"Directorio de destino seleccionado: {self.output_dir}")
    
    def convert_shp_to_geojson(self):
        if not self.shp_dir or not self.output_dir:
            messagebox.showwarning("Advertencia", "Por favor, selecciona ambos directorios.")
            return
        
        # Convertir todos los archivos SHP en el directorio de entrada a GeoJSON
        converted_files = 0
        for shp_file in os.listdir(self.shp_dir):
            if shp_file.endswith('.shp'):
                shp_path = os.path.join(self.shp_dir, shp_file)
                geojson_file = os.path.splitext(shp_file)[0] + '.geojson'
                geojson_path = os.path.join(self.output_dir, geojson_file)
                
                driver = ogr.GetDriverByName('ESRI Shapefile')
                dataSource = driver.Open(shp_path, 0)  # Solo lectura
                
                if dataSource is None:
                    messagebox.showerror("Error", f"No se pudo abrir {shp_file}")
                    continue
                
                layer = dataSource.GetLayer()
                geojson_driver = ogr.GetDriverByName('GeoJSON')
                if os.path.exists(geojson_path):
                    geojson_driver.DeleteDataSource(geojson_path)
                outDataSource = geojson_driver.CreateDataSource(geojson_path)
                outLayer = outDataSource.CopyLayer(layer, layer.GetName())
                
                # Cerrar archivos
                outDataSource = None
                dataSource = None
                converted_files += 1

        if converted_files > 0:
            messagebox.showinfo("Éxito", f"Conversión exitosa. Archivos convertidos: {converted_files}")
        else:
            messagebox.showwarning("Advertencia", "No se encontraron archivos SHP para convertir.")
    
if __name__ == "__main__":
    root = tk.Tk()
    app = SHPtoGeoJSONConverter(root)
    root.mainloop()

# Configuración de Upload de Imágenes

## 📦 Archivos Creados

1. **`src/services/imageService.js`** - Servicio para subir imágenes al backend
2. **`src/components/ImageUpload.jsx`** - Componente para subir una sola imagen
3. **`src/components/MultipleImageUpload.jsx`** - Componente para subir múltiples imágenes

## ✅ Módulos Actualizados

Los siguientes módulos ya están configurados con upload de imágenes:

1. **`src/pages/Banners/Banners.jsx`** - Una imagen por banner
2. **`src/pages/Brands/Brands.jsx`** - Logo de marca
3. **`src/pages/Categories/Categories.jsx`** - Imagen de categoría
4. **`src/pages/Products/Products.jsx`** - Múltiples imágenes por producto (hasta 5)

## 🎯 Uso

### Para una sola imagen (Banners, Brands, Categories):

```jsx
import ImageUpload from '../../components/ImageUpload';

<Form.Item
  name="imageUrl"
  label="Imagen"
  rules={[{ required: true, message: 'Por favor suba una imagen' }]}
>
  <ImageUpload folder="banners" />
</Form.Item>
```

### Para múltiples imágenes (Products):

```jsx
import MultipleImageUpload from '../../components/MultipleImageUpload';

<Form.Item
  name="imageUrls"
  label="Imágenes del Producto"
  rules={[{ required: true, message: 'Por favor suba al menos una imagen' }]}
>
  <MultipleImageUpload folder="products" maxCount={5} />
</Form.Item>
```

## 🔧 Backend - Endpoint Requerido

Tu backend necesita implementar un endpoint para recibir las imágenes:

### Endpoint: `POST /api/upload/image`

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `image`: archivo de imagen
  - `folder`: string con la carpeta de destino

**Response esperada:**
```json
{
  "url": "https://tu-servicio.com/images/banners/imagen-123.jpg"
}
```

### Ejemplo con Spring Boot:

```java
@RestController
@RequestMapping("/api/upload")
public class ImageUploadController {

    @PostMapping("/image")
    public ResponseEntity<Map<String, String>> uploadImage(
        @RequestParam("image") MultipartFile image,
        @RequestParam(value = "folder", defaultValue = "general") String folder
    ) throws IOException {
        
        // 1. Validar el archivo
        if (image.isEmpty()) {
            throw new IllegalArgumentException("El archivo está vacío");
        }
        
        // 2. Generar nombre único
        String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
        
        // 3. Opción A: Guardar en servidor local
        Path uploadPath = Paths.get("uploads/" + folder);
        Files.createDirectories(uploadPath);
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        String url = "http://localhost:8080/uploads/" + folder + "/" + fileName;
        
        // 3. Opción B: Subir a Cloudinary (recomendado)
        // Map uploadResult = cloudinary.uploader().upload(image.getBytes(), 
        //     ObjectUtils.asMap("folder", folder));
        // String url = (String) uploadResult.get("secure_url");
        
        // 3. Opción C: Subir a AWS S3
        // s3Client.putObject(bucket, folder + "/" + fileName, image.getInputStream(), metadata);
        // String url = "https://" + bucket + ".s3.amazonaws.com/" + folder + "/" + fileName;
        
        // 4. Retornar la URL
        Map<String, String> response = new HashMap<>();
        response.put("url", url);
        return ResponseEntity.ok(response);
    }
}
```

### Servir archivos estáticos (si guardas localmente):

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}
```

## 🌐 Opciones de Almacenamiento

### 1. **Cloudinary** (Recomendado para producción)

**Ventajas:**
- CDN global incluido
- Transformaciones automáticas
- Plan gratuito generoso
- Muy fácil de usar

**Setup:**
```java
// Agregar dependencia
// implementation 'com.cloudinary:cloudinary-http44:1.33.0'

@Bean
public Cloudinary cloudinary() {
    return new Cloudinary(ObjectUtils.asMap(
        "cloud_name", "tu-cloud-name",
        "api_key", "tu-api-key",
        "api_secret", "tu-api-secret"
    ));
}
```

### 2. **AWS S3**

**Ventajas:**
- Altamente escalable
- Muy usado en producción
- Integración con otros servicios AWS

**Setup:**
```java
// Agregar dependencia
// implementation 'software.amazon.awssdk:s3:2.x.x'

@Bean
public S3Client s3Client() {
    return S3Client.builder()
        .region(Region.US_EAST_1)
        .credentialsProvider(DefaultCredentialsProvider.create())
        .build();
}
```

### 3. **Almacenamiento Local**

**Solo para desarrollo/pruebas:**
- Simple de implementar
- No requiere servicios externos
- No recomendado para producción

## 📝 Configuración del Frontend

Asegúrate de que la URL del backend esté configurada en:
`src/config/api.js`

```javascript
const API_BASE_URL = 'http://localhost:8080'; // Cambiar en producción
```

## 🚀 Próximos Pasos

1. Implementa el endpoint `/api/upload/image` en tu backend
2. Elige tu método de almacenamiento (Cloudinary recomendado)
3. Actualiza otros formularios para usar los componentes de upload
4. Prueba subiendo imágenes en Banners

## ⚙️ Personalización

Puedes ajustar:
- `maxSizeMB`: Tamaño máximo de imagen (default: 5MB)
- `maxCount`: Máximo de imágenes para multiple upload (default: 5)
- `folder`: Carpeta de destino en el servidor

## 🐛 Troubleshooting

**Error CORS:** Asegúrate de que tu backend permita `Content-Type: multipart/form-data`

**Imagen no se muestra:** Verifica que la URL retornada sea accesible públicamente

**Error 413:** El archivo es muy grande, aumenta el límite en tu servidor

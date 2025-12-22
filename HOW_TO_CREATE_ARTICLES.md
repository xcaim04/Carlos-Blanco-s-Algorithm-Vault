# Guía: Cómo Crear Artículos en el Blog

Esta guía te explica paso a paso cómo agregar nuevos artículos al blog de CP Algorithms.

## Estructura de un Artículo

Los artículos se almacenan como archivos Markdown (`.md`) en la carpeta `/articles/` del proyecto.

### Formato del Archivo

Cada archivo de artículo debe seguir este formato:

```markdown
---
title: "Título del Artículo"
description: "Breve descripción del artículo que aparecerá en las tarjetas"
date: "2024-01-15"
author: "Tu Nombre"
category: "Categoría del Artículo"
readTime: "10 min read"
---

# Título del Artículo

Tu contenido aquí...
```

### Metadatos Requeridos (Frontmatter)

Los metadatos van entre `---` al inicio del archivo:

- **title**: El título principal del artículo
- **description**: Una descripción corta (1-2 frases) que se muestra en las tarjetas
- **date**: Fecha en formato YYYY-MM-DD
- **author**: Nombre del autor
- **category**: Una de las siguientes categorías:
  - Algebra
  - Data Structures
  - Dynamic Programming
  - Graph Theory
  - String Processing
  - Combinatorics
  - Numerical Methods
  - Geometry
- **readTime**: Tiempo estimado de lectura (ej: "5 min read")

## Pasos para Crear un Nuevo Artículo

### 1. Crear el Archivo

Crea un nuevo archivo `.md` en la carpeta `articles/`:

```
articles/
  ├── binary-search.md
  ├── segment-tree.md
  └── tu-nuevo-articulo.md  ← Nuevo archivo
```

**Importante**: El nombre del archivo será la URL del artículo. Por ejemplo:
- `quick-sort.md` → `/articles/quick-sort`
- `kmp-algorithm.md` → `/articles/kmp-algorithm`

### 2. Agregar el Contenido

Abre el archivo y agrega los metadatos y el contenido:

```markdown
---
title: "Quick Sort Algorithm"
description: "Learn about the Quick Sort algorithm, its implementation, and time complexity analysis"
date: "2024-01-20"
author: "John Doe"
category: "Data Structures"
readTime: "8 min read"
---

# Quick Sort Algorithm

Quick Sort es un algoritmo de ordenamiento eficiente que utiliza la estrategia divide y conquista...

## Complejidad

- **Tiempo**: O(n log n) promedio, O(n²) peor caso
- **Espacio**: O(log n)

## Implementación

```cpp
void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pivot = partition(arr, low, high);
        quickSort(arr, low, pivot - 1);
        quickSort(arr, pivot + 1, high);
    }
}
```

## Ventajas

1. Eficiente en la práctica
2. In-place (no requiere memoria adicional significativa)
3. Buen uso de caché

...
```

### 3. Formatear el Contenido

Puedes usar todas las características de Markdown:

#### Títulos
```markdown
# Título H1
## Título H2
### Título H3
```

#### Listas
```markdown
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
```

#### Código
Para bloques de código, especifica el lenguaje:

```markdown
```cpp
int main() {
    cout << "Hello World";
    return 0;
}
```
```

Lenguajes soportados: `cpp`, `python`, `java`, `javascript`, `typescript`, etc.

#### Enlaces
```markdown
[Texto del enlace](https://url.com)
```

#### Imágenes
```markdown
![Descripción de la imagen](/ruta/a/imagen.png)
```

#### Énfasis
```markdown
**Negrita**
*Cursiva*
\`Código inline\`
```

#### Citas
```markdown
> Esta es una cita o nota importante
```

#### Tablas
```markdown
| Algoritmo | Tiempo | Espacio |
|-----------|---------|---------|
| Quick Sort | O(n log n) | O(log n) |
| Merge Sort | O(n log n) | O(n) |
```

## Categorías Disponibles

Asegúrate de usar exactamente uno de estos nombres para la categoría:

- **Algebra**: Teoría de números, aritmética modular, etc.
- **Data Structures**: Árboles, heaps, segment trees, etc.
- **Dynamic Programming**: Problemas de programación dinámica
- **Graph Theory**: Algoritmos de grafos, caminos más cortos, etc.
- **String Processing**: Algoritmos de strings, pattern matching
- **Combinatorics**: Combinatoria, permutaciones, probabilidad
- **Numerical Methods**: Métodos numéricos, cálculo
- **Geometry**: Geometría computacional

## Ejemplo Completo

Aquí está un ejemplo completo de un artículo:

```markdown
---
title: "Binary Search Tree Implementation"
description: "Complete guide to implementing and using Binary Search Trees with examples in C++"
date: "2024-01-25"
author: "Jane Smith"
category: "Data Structures"
readTime: "12 min read"
---

# Binary Search Tree Implementation

Un Binary Search Tree (BST) es una estructura de datos fundamental...

## Propiedades

Un BST tiene las siguientes propiedades:

1. El subárbol izquierdo contiene solo nodos con valores menores
2. El subárbol derecho contiene solo nodos con valores mayores
3. Ambos subárboles también son BSTs

## Implementación

```cpp
struct Node {
    int data;
    Node *left, *right;
    
    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};

class BST {
private:
    Node* root;
    
    Node* insert(Node* node, int val) {
        if (!node) return new Node(val);
        
        if (val < node->data)
            node->left = insert(node->left, val);
        else if (val > node->data)
            node->right = insert(node->right, val);
            
        return node;
    }
    
public:
    BST() : root(nullptr) {}
    
    void insert(int val) {
        root = insert(root, val);
    }
};
```

## Operaciones Comunes

### Búsqueda
La búsqueda en un BST tiene complejidad O(log n) en promedio...

### Inserción
La inserción mantiene la propiedad del BST...

## Conclusión

Los BSTs son fundamentales para muchos algoritmos avanzados...
```

## Verificar tu Artículo

Después de crear el archivo:

1. El artículo aparecerá automáticamente en la página principal
2. Se puede filtrar por su categoría
3. Se puede buscar por título o contenido
4. Los usuarios autenticados pueden dejar comentarios

## Tips para Buenos Artículos

1. **Título claro**: Usa títulos descriptivos y concisos
2. **Descripción atractiva**: La descripción debe enganchar al lector
3. **Estructura**: Usa subtítulos (##, ###) para organizar el contenido
4. **Código comentado**: Explica las partes importantes del código
5. **Ejemplos**: Incluye ejemplos prácticos siempre que sea posible
6. **Complejidad**: Menciona la complejidad temporal y espacial
7. **Referencias**: Agrega enlaces a recursos adicionales si es relevante

## Notas Importantes

- Los archivos deben usar codificación UTF-8
- No uses caracteres especiales en el nombre del archivo
- El slug (URL) se genera automáticamente del nombre del archivo
- Los cambios se reflejan inmediatamente (sin necesidad de rebuild en dev)
- El sistema soporta resaltado de sintaxis automático para código

## Solución de Problemas

**El artículo no aparece:**
- Verifica que el archivo esté en `/articles/`
- Asegúrate de que tenga extensión `.md`
- Revisa que los metadatos estén completos y bien formateados

**El formato no se ve bien:**
- Revisa que uses la sintaxis correcta de Markdown
- Verifica que los bloques de código tengan el lenguaje especificado

**La categoría no funciona:**
- Usa exactamente uno de los nombres de categoría listados arriba
- Las categorías son case-sensitive

---

¡Listo! Ahora puedes crear artículos increíbles para el blog de CP Algorithms.

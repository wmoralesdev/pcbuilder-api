#include <iostream>
using namespace std;

struct nodo{
    int dato;
    nodo* sig;
};

struct nodoDoble{
    int dato;
    nodoDoble* sig,* ant;
};

void mostrarLista(nodo* lista);
void mostrarListaDoble(nodoDoble* listaDoble);

void pop(nodo** lista);

void pushBack(nodo** lista, int dato);
void pushFront(nodo** lista, int dato);

void pushBackDoble(nodoDoble** listaDoble, int dato);
void pushFrontDoble(nodoDoble** listaDoble, int dato);

int main(void) {
    nodo* pInicio = NULL,* pCopia = NULL;
    nodoDoble* pInicioD = NULL,* pFinalD = NULL,* pCopiaD = NULL;

    // Llenar lista pInicio y pInicioD con numeros pares
    for(int i = 0; i <= 10; i += 2) {
        pushBack(&pInicio, i);
        pushBackDoble(&pInicioD, i);
    }

    // Invertir el contenido de pInicio y almacenarlo en pCopia
    // pInicio contiene: 0 - 2 - 4 - 6 - 8 - 10
    // pCopia debe contener: 10 - 8 - 6 - 4 - 2 - 0

    // Mostrando antes de invertir
    cout << "Lista original: " << endl;
    mostrarLista(pInicio);
    cout << endl;

    // 1. Recorrer toda la lista o hacer el proceso mientras tenga datos
    while(pInicio != NULL) {
        // 2. Insertar elemento pInicio->dato con pushFront para que el primero en entrar, sea el ultimo en salir
        pushFront(&pCopia, pInicio->dato);
        
        // 3. Eliminar elemento insertado con pop
        pop(&pInicio);

        // PD: While termina cuando se recorre toda la lista
    }

    // 4. Imprimir
    cout << "Lista copia (invertida): " << endl;
    mostrarLista(pCopia);
    cout << endl;

    // Hacer lo mismo, pero con lista doble
    cout << "---------------------------------------------" << endl;

    // 1. Encontrar el ultimo nodo de la lista doble (sin modificarla)
    nodoDoble* aux = pInicioD;

    while(aux->sig)
        aux = aux->sig;

    // 2. Guardar esa direccion de mem en pFinalD
    pFinalD = aux;

    // 2.5 Imprimir antes de modificar
    cout << "Lista original: " << endl;
    mostrarListaDoble(pInicioD);
    cout << endl;

    // 3. Recorrer de atras hacia adelante la lista
    while(pFinalD != NULL) {
        // 4. Insertar con pushBack en pCopiaD
        pushBackDoble(&pCopiaD, pFinalD->dato);

        // 5. Regresar a posicion anterior (recorrer de atras hacia adelante)
        pFinalD = pFinalD->ant;
    }

    // 6. Imprimir
    cout << "Lista copia (invertida): " << endl;
    mostrarListaDoble(pCopiaD);
    cout << endl;
}

void mostrarLista(nodo* lista) {
    if(lista) {
        cout << lista->dato << "\t";
        mostrarLista(lista->sig);
    }
}

void mostrarListaDoble(nodoDoble* listaDoble) {
    if(listaDoble) {
        cout << listaDoble->dato << "\t";
        mostrarListaDoble(listaDoble->sig);
    }
}

void pop(nodo** lista) {
    if((*lista)->sig)
        *lista = (*lista)->sig;
    else
        *lista = NULL;
}

void pushFront(nodo** lista, int dato) {
    nodo* n = new nodo;
    n->dato = dato;
    n->sig = *lista;

    *lista = n;
}

void pushFrontDoble(nodoDoble** lista, int dato) {
    nodoDoble* n = new nodoDoble;
    n->dato = dato;
    n->ant = NULL;
    n->sig = *lista;

    *lista = n;
}

void pushBack(nodo** lista, int dato) {
    nodo* n = new nodo;
    n->dato = dato;
    n->sig = NULL;
    
    if(!*lista)
        *lista = n;
    else {
        nodo* aux = *lista;

        while(aux->sig)
            aux = aux->sig;

        aux->sig = n;
    }
}

void pushBackDoble(nodoDoble** listaDoble, int dato) {
    nodoDoble* n = new nodoDoble;
    n->dato = dato;
    n->sig = NULL;
    n->ant = NULL;
    
    if(!*listaDoble)
        *listaDoble = n;
    else {
        nodoDoble* aux = *listaDoble;

        while(aux->sig)
            aux = aux->sig;

        n->ant = aux;
        aux->sig = n;
    }
}
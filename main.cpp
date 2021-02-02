void print(node* list) {
    // Llegas al ultimo elemento (sin consultar)
    
    // Lista tiene
    // 1 -> 2 -> 3 -> 4 -> NULL
    while(list->next)
        list = list->next;

    /*
        list esta en 1
        while(list->next) cumple
            list = list->next

        list esta en 2
        while(list->next) cumple
            list = list->next

        list esta en 3
        while(list->next) cumple
            list = list->next

        list esta en 4
        while(list->next) no cumple
            
        list queda en 4, con ->next = NULL y ->prev = 3
    */

    // List esta en 4
    while(list) {
        cout << list->data << endl;
        list = list->prev;
    }

    /*
        List tiene NULL <- 1 <- 2 <- 3 <- 4

        List esta en 4
        while(list) cumple
            print(list->data)
            list = list->prev;
        
        List esta en 3
        while(list) cumple
            print(list->data)
            list = list->prev;

        List esta en 2
        while(list) cumple
            print(list->data)
            list = list->prev;

        List esta en 1
        while(list) cumple
            print(list->data)
            list = list->prev;

        List esta en NULL
        while(list) no cumple
    */
}
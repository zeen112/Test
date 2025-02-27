function inventoryApp() {
  return {
    activeTab: "dashboard",
    sidebarOpen: false,
    isItemModalOpen: false,
    isCategoryModalOpen: false,
    isDeleteModalOpen: false,
    isReportModalOpen: false,
    itemToEdit: null,
    categoryToEdit: null,
    deleteItemId: null,
    deleteCategoryId: null,
    deleteMessage: "",
    searchTerm: "",
    categorySearchTerm: "",
    filterCategory: "all",
    globalSearch: "",
    newItem: {
      id: "",
      name: "",
      category: "",
      price: 0,
      stock: 0,
      description: "",
    },
    newCategory: {
      id: "",
      name: "",
      icon: "fa-box",
      color: "#4F46E5",
      description: "",
    },
    items: [],
    categories: [],
    settingsOpen: false,

    init() {
      const savedItems = localStorage.getItem("ariseeinven_items");
      const savedCategories = localStorage.getItem("ariseeinven_categories");

      if (savedItems) {
        this.items = JSON.parse(savedItems);
      } else {
        // Sample data
        this.items = [
          {
            id: this.generateId(),
            name: "Laptop ASUS VivoBook",
            category: "electronics",
            price: 8500000,
            stock: 12,
            description: "Laptop ASUS VivoBook dengan spesifikasi terbaru.",
          },
          {
            id: this.generateId(),
            name: "Smartphone Samsung Galaxy",
            category: "electronics",
            price: 3800000,
            stock: 25,
            description: "Smartphone Samsung Galaxy seri terbaru.",
          },
          {
            id: this.generateId(),
            name: "Kemeja Slim Fit Navy",
            category: "fashion",
            price: 250000,
            stock: 45,
            description: "Kemeja dengan bahan premium, potongan slim fit.",
          },
          {
            id: this.generateId(),
            name: "Headphone Bluetooth",
            category: "electronics",
            price: 450000,
            stock: 8,
            description: "Headphone Bluetooth dengan noise cancelling.",
          },
          {
            id: this.generateId(),
            name: "Sepatu Sneakers",
            category: "fashion",
            price: 550000,
            stock: 18,
            description: "Sepatu sneakers desain modern.",
          },
          {
            id: this.generateId(),
            name: "Buku Bisnis & Marketing",
            category: "books",
            price: 175000,
            stock: 32,
            description: "Buku bisnis bestseller.",
          },
          {
            id: this.generateId(),
            name: "Smart Watch",
            category: "electronics",
            price: 1200000,
            stock: 4,
            description: "Smart watch dengan fitur fitness tracking.",
          },
        ];
        this.saveToLocalStorage();
      }

      if (savedCategories) {
        this.categories = JSON.parse(savedCategories);
      } else {
        // Sample categories
        this.categories = [
          {
            id: "electronics",
            name: "Elektronik",
            icon: "fa-laptop",
            color: "#3B82F6",
            description: "Semua jenis barang elektronik.",
          },
          {
            id: "fashion",
            name: "Fashion",
            icon: "fa-tshirt",
            color: "#EC4899",
            description: "Pakaian, sepatu, dan aksesori fashion.",
          },
          {
            id: "books",
            name: "Buku",
            icon: "fa-book",
            color: "#F59E0B",
            description: "Berbagai kategori buku.",
          },
        ];
        this.saveToLocalStorage();
      }
    },

    // Helper methods
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },

    generateId() {
      return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      );
    },

    saveToLocalStorage() {
      localStorage.setItem("ariseeinven_items", JSON.stringify(this.items));
      localStorage.setItem(
        "ariseeinven_categories",
        JSON.stringify(this.categories)
      );
    },

    // Backup Data
    backupData() {
      const data = {
        items: this.items,
        categories: this.categories,
      };
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Backup_Data-AInven.json";
      a.click();
      URL.revokeObjectURL(url);
    },

    // Import Data
    importData() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const data = JSON.parse(e.target.result);
            this.items = data.items || [];
            this.categories = data.categories || [];
            this.saveToLocalStorage();
          };
          reader.readAsText(file);
        }
      };
      input.click();
    },

    // Item methods
    openItemModal() {
      this.itemToEdit = null;
      this.newItem = {
        id: this.generateId(),
        name: "",
        category: "",
        price: 0,
        stock: 0,
        description: "",
      };
      this.isItemModalOpen = true;
    },

    editItem(index) {
      this.itemToEdit = index;
      this.newItem = { ...this.items[index] };
      this.isItemModalOpen = true;
    },

    saveItem() {
      if (this.newItem.name.trim() === "" || this.newItem.category === "") {
        alert("Nama barang dan kategori harus diisi!");
        return;
      }

      if (this.itemToEdit !== null) {
        this.items[this.itemToEdit] = { ...this.newItem };
      } else {
        this.items.push({ ...this.newItem });
      }

      this.saveToLocalStorage();
      this.isItemModalOpen = false;
    },

    deleteItem(id) {
      this.deleteItemId = id;
      this.deleteMessage = "Apakah Anda yakin ingin menghapus barang ini?";
      this.isDeleteModalOpen = true;
    },

    // Category methods
    openCategoryModal() {
      this.categoryToEdit = null;
      this.newCategory = {
        id: this.generateId(),
        name: "",
        icon: "fa-box",
        color: "#4F46E5",
        description: "",
      };
      this.isCategoryModalOpen = true;
    },

    editCategory(index) {
      this.categoryToEdit = index;
      this.newCategory = { ...this.categories[index] };
      this.isCategoryModalOpen = true;
    },

    saveCategory() {
      if (this.newCategory.name.trim() === "") {
        alert("Nama kategori harus diisi!");
        return;
      }

      if (this.categoryToEdit !== null) {
        this.categories[this.categoryToEdit] = { ...this.newCategory };
      } else {
        this.categories.push({ ...this.newCategory });
      }

      this.saveToLocalStorage();
      this.isCategoryModalOpen = false;
    },

    deleteCategory(id) {
      const hasItems = this.items.some((item) => item.category === id);
      if (hasItems) {
        alert(
          "Kategori ini memiliki barang. Hapus atau pindahkan barang terlebih dahulu."
        );
        return;
      }

      this.deleteCategoryId = id;
      this.deleteMessage = "Apakah Anda yakin ingin menghapus kategori ini?";
      this.isDeleteModalOpen = true;
    },

    confirmDelete() {
      if (this.deleteItemId) {
        this.items = this.items.filter((item) => item.id !== this.deleteItemId);
        this.deleteItemId = null;
      }

      if (this.deleteCategoryId) {
        this.categories = this.categories.filter(
          (category) => category.id !== this.deleteCategoryId
        );
        this.deleteCategoryId = null;
      }

      this.saveToLocalStorage();
      this.isDeleteModalOpen = false;
    },

    // Report methods
    openReportModal() {
      this.isReportModalOpen = true;
    },

    calculateTotalValue() {
      return this.items.reduce(
        (total, item) => total + item.price * item.stock,
        0
      );
    },

    getRecentItems() {
      return this.items.slice(-5);
    },

    viewAllItems() {
      this.activeTab = "inventory"; // Switch to the inventory tab
      this.filterCategory = "all"; // Show all items
    },

    // Filter and search methods
    filteredItems() {
      let result = this.items;

      if (this.filterCategory !== "all") {
        result = result.filter((item) => item.category === this.filterCategory);
      }

      if (this.searchTerm.trim() !== "") {
        const term = this.searchTerm.toLowerCase();
        result = result.filter(
          (item) =>
            item.name.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term) ||
            item.id.toLowerCase().includes(term)
        );
      }

      return result;
    },

    filteredCategories() {
      let result = this.categories;

      if (this.categorySearchTerm.trim() !== "") {
        const term = this.categorySearchTerm.toLowerCase();
        result = result.filter(
          (category) =>
            category.name.toLowerCase().includes(term) ||
            category.description.toLowerCase().includes(term)
        );
      }

      return result;
    },

    // Global search
    performGlobalSearch() {
      if (this.globalSearch.trim() === "") return;

      this.searchTerm = this.globalSearch;
      this.activeTab = "inventory";
      this.filterCategory = "all";
      this.globalSearch = "";
    },
  };
}

// Tambahkan fungsi ini di dalam objek inventoryApp
importExcel() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".xlsx, .xls";
  input.onchange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        // Proses data JSON dan tambahkan ke items
        json.forEach((item) => {
          this.items.push({
            id: this.generateId(),
            name: item.Nama || "",
            category: item.Kategori || "",
            price: item.Harga || 0,
            stock: item.Stok || 0,
            description: item.Deskripsi || "",
          });
        });

        this.saveToLocalStorage();
        alert("Data berhasil diimpor!");
      };
      reader.readAsArrayBuffer(file);
    }
  };
  input.click();
},
// Tambahkan fungsi ini di dalam objek inventoryApp
viewCategoryItems(categoryId) {
  const itemsInCategory = this.items.filter((item) => item.category === categoryId);
  const categoryName = this.categories.find((cat) => cat.id === categoryId)?.name || "Unknown";

  let message = `Barang dalam kategori ${categoryName}:\n\n`;
  itemsInCategory.forEach((item) => {
    message += `- ${item.name}\n`;
  });

  alert(message);
},

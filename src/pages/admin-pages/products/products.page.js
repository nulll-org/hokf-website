import onlineStore from "../../../store/modules/online-store";
import {
  newProduct,
  setProductToArchived,
  setProductToUnarchived,
  updateProduct,
} from "../../../store/api";
import Modal from "../../../components/modal/index.vue";
import { RxFormBuilder } from "@rxweb/reactive-forms";
import { ProductValidator } from "../../../store/validators";
import { httpService } from "../../../services/http.service";
import { errorNotification } from "../../../services/notification.service";

export default {
  name: "Product",
  components: { Modal },
  props: [],
  data() {
    const formBuilder = new RxFormBuilder();
    const productFormGroup = formBuilder.formGroup(ProductValidator);
    return {
      showArchive: false,
      isModalOpen: false,
      modalData: null,
      modalAction: null,
      productTypes: ["Jersey"],
      productFormGroup,
      previewImage:
        "https://res.cloudinary.com/hokf-gardens/image/upload/v1631576503/Click_to_Upload_gkgs43.jpg",
      cloudName: "hokf-gardens",
    };
  },
  computed: {
    products() {
      if (this.showArchive) {
        return onlineStore.state.archivedProducts;
      } else {
        return onlineStore.state.allProducts;
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    addImage() {
      this.$refs.image.click();
    },
    uploadImage() {
      let image = event.target.files[0];
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "omkklh1s");
      httpService
        .post(
          `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`,
          formData
        )
        .then((response) => {
          this.productFormGroup.props.photo = response.data.secure_url;
          this.previewImage = URL.createObjectURL(image);
        })
        .catch(() => {
          errorNotification(
            "There was a problem uploading the image. Please try again."
          );
        });
    },
    async submitCreate() {
      if (this.productFormGroup.valid) {
        const product = this.productFormGroup.value;
        const sold = { xl: 0, l: 0, m: 0, s: 0, xs: 0 };
        const available = {
          xl: parseInt(product.xl) || 0,
          l: parseInt(product.l) || 0,
          m: parseInt(product.m) || 0,
          s: parseInt(product.s) || 0,
          xs: parseInt(product.xs) || 0,
        };
        const discount = product.discountPercentage || 0;
        const stock = Object.values(available).reduce((a, b) => a + b, 0) > 0;
        const _product = {
          archived: false,
          name: this.productFormGroup.value.name,
          description: this.productFormGroup.value.description,
          photo: this.productFormGroup.value.photo,
          price: parseFloat(this.productFormGroup.value.price),
          type: this.productFormGroup.value.type,
          quantitySold: sold,
          quantityAvailable: available,
          isInStock: stock,
          discountPercentage: discount,
        };
        await newProduct({ ..._product }).then(() => {
          this.fetchProducts();
          this.closeModal();
        });
      }
    },
    async submitUpdate() {
      if (this.productFormGroup.valid) {
        console.log(this.productFormGroup);
        const product = this.productFormGroup.value;
        const available = {
          xl: parseInt(product.xl) || 0,
          l: parseInt(product.l) || 0,
          m: parseInt(product.m) || 0,
          s: parseInt(product.s) || 0,
          xs: parseInt(product.xs) || 0,
        };
        const discount = product.discountPercentage > -1 ? product.discountPercentage : 0;
        const stock = Object.values(available).reduce((a, b) => a + b, 0) > 0;
        const _product = {
          name: this.productFormGroup.value.name,
          description: this.productFormGroup.value.description,
          photo: this.productFormGroup.value.photo,
          price: parseFloat(this.productFormGroup.value.price),
          type: this.productFormGroup.value.type,
          quantityAvailable: available,
          isInStock: stock,
          discountPercentage: discount,
        };
        await updateProduct(_product, this.modalData).then(() => {
          this.fetchProducts();
          this.closeModal();
        });
      }
    },
    openModal(product, action) {
      this.isModalOpen = true;
      this.modalAction = action;
      this.modalData = product.id;
      if (action == "edit") {
        this.previewImage = product.photo;
        Object.keys(this.productFormGroup.value).map((key) => {
          this.productFormGroup.props[key] =
            product[key] || product.quantityAvailable[key];
        });
      }
    },
    closeModal() {
      this.isModalOpen = false;
      this.clearProductState();
    },
    toggleArchivedProducts() {
      this.showArchive = !this.showArchive;
    },
    archiveProduct(productId) {
      setProductToArchived(productId).then(() => {
        this.$store.dispatch("fetchAllProducts");
        this.$store.dispatch("fetchArchivedProducts");
      });
    },
    unarchiveProduct(productId) {
      setProductToUnarchived(productId).then(() => {
        this.$store.dispatch("fetchAllProducts");
        this.$store.dispatch("fetchArchivedProducts");
      });
    },
    clearProductState() {
      this.previewImage =
        "https://res.cloudinary.com/hokf-gardens/image/upload/v1631576503/Click_to_Upload_gkgs43.jpg";
      Object.keys(this.productFormGroup.value).map((key) => {
        this.productFormGroup.props[key] = null;
      });
    },
    fetchProducts() {
      this.$store.dispatch("fetchAllProducts");
      this.$store.dispatch("fetchArchivedProducts");
    },
  },
};

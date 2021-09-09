import Vue from "vue";

export const errorNotification = (message) => {
    Vue.$toast.error(message)
}

export const successNotification = (message) => {
    Vue.$toast.success(message)
}

export const warningNotification = (message) => {
    Vue.$toast.warning(message)
}

export const notify = (message) => {
    Vue.$toast(message)
}


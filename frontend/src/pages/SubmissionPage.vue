<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import BaseTextArea from '@/components/BaseTextArea.vue';
import { reactive } from 'vue';

type FormData = {
  senderFirstName: string;
  senderLastName: string;
  senderEmail: string;
  senderPhone: string;
  description: string;
}

const formData = reactive<FormData>({
  senderFirstName: '',
  senderLastName: '',
  senderEmail: '',
  senderPhone: '',
  description: '',
});
</script>

<template>
  <div class="form-description"></div>
  <div class="form-wrapper">
    <div class="form">
      <BaseInput
        :style="{ gridColumnStart: 'col-1-start', gridColumnEnd: 'col-1-end' }"
        v-model="formData.senderFirstName"
        type="text"
        label="Ad"
      />
      <BaseInput
        :style="{ gridColumnStart: 'col-2-start', gridColumnEnd: 'col-2-end' }"
        v-model="formData.senderLastName"
        type="text"
        label="Soyad"
      />
      <BaseInput
        :style="{ gridColumnStart: 'col-1-start', gridColumnEnd: 'col-2-end' }"
        v-model="formData.senderEmail"
        type="email"
        label="Email"
      />
      <BaseInput
        :style="{ gridColumnStart: 'col-1-start', gridColumnEnd: 'col-2-end' }"
        v-model="formData.senderPhone"
        type="tel"
        label="Telefon Numarası"
      />
      <BaseTextArea
        :style="{ gridColumnStart: 'col-1-start', gridColumnEnd: 'col-2-end' }"
        v-model="formData.description"
        label="Açıklama"
        :max-length="500"
        :show-char-count="true"
      />
    </div>
  </div>
</template>

<style src="@/styles/submission-page.sass"></style>

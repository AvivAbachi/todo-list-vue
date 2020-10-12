<template>
  <modal :show="show" class="about-modal" @close="$emit('close')">
    <card>
      <card-header>
        <h2>About</h2>
        <btn :icon="true" color="clean" @click="$emit('close')">
          <fix-icon />
        </btn>
      </card-header>
      <card-body> Code And Design by Aviv Abachi <a href="https://github.com/AvivAbachi" target="blink">Link</a> </card-body>
      <card-footer>
        <btn :rounded="true" color="blue" @click="$emit('open')">
          <download-icon />
          Import
        </btn>
        <btn :rounded="true" color="green" @click="$emit('save')">
          <upload-icon />
          Export
        </btn>
        <btn :rounded="true" color="gray" @click="$emit('close')">
          Close
        </btn>
      </card-footer>
    </card>
  </modal>
</template>

<script>
import Btn from './elements/Btn';
import Modal from './elements/Modal';
import Card, { CardBody, CardFooter, CardHeader } from './elements/Card';
import { DownloadIcon, FixIcon, UploadIcon } from './elements/Icons';

export default {
  name: 'About',
  components: { Btn, Card, CardHeader, CardBody, CardFooter, FixIcon, Modal, UploadIcon, DownloadIcon },
  props: {
    show: { type: Boolean, default: true },
  },
};
</script>

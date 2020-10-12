<script>
import { h } from 'vue';
export const AddIcon = {
  name: 'AddIcon',
  setup() {
    return () =>
      h(
        <SvgIcon>
          <line x1='12' y1='5' x2='12' y2='19' />
          <line x1='5' y1='12' x2='19' y2='12' />
        </SvgIcon>
      );
  },
};
export const CheckIcon = {
  name: 'CheckIcon',
  setup() {
    return () =>
      h(
        <SvgIcon>
          <polyline points='20 6 9 17 4 12' />
        </SvgIcon>
      );
  },
};
export const EditIcon = {
  name: 'EditIcon',
  setup() {
    return () =>
      h(
        <SvgIcon>
          <path d='M12 20h9' />
          <path d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' />
        </SvgIcon>
      );
  },
};
export const RemoveIcon = {
  name: 'RemoveIcon',
  setup() {
    return () =>
      h(
        <SvgIcon>
          <polyline points='3 6 5 6 21 6' />
          <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
          <line x1='10' y1='11' x2='10' y2='17' />
          <line x1='14' y1='11' x2='14' y2='17' />
        </SvgIcon>
      );
  },
};
export const InfoIcon = {
  name: 'InfoIcon',
  setup() {
    return () =>
      h(
        <SvgIcon>
          <circle cx='12' cy='12' r='10' />
          <line x1='12' y1='16' x2='12' y2='12' />
          <line x1='12' y1='8' x2='12' y2='8' />
        </SvgIcon>
      );
  },
};
export const MoonIcon = {
  name: 'MoonIcon',
  setup() {
    return () =>
      h(
        <SvgIcon>
          <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
        </SvgIcon>
      );
  },
};
export const SunIcon = {
  name: 'SunIcon',
  setup() {
    return () =>
      h(
        <SvgIcon>
          <circle cx='12' cy='12' r='5' />
          <line x1='12' y1='1' x2='12' y2='3' />
          <line x1='12' y1='21' x2='12' y2='23' />
          <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
          <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
          <line x1='1' y1='12' x2='3' y2='12' />
          <line x1='21' y1='12' x2='23' y2='12' />
          <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
          <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
        </SvgIcon>
      );
  },
};
export const FixIcon = {
  name: 'FixIcon',
  setup() {
    return () =>
      h(
        <SvgIcon>
          <line x1='18' y1='6' x2='6' y2='18' />
          <line x1='6' y1='6' x2='18' y2='18' />
        </SvgIcon>
      );
  },
};
export const InboxIcon = {
  name: 'InboxIcon',
  setup() {
    return () =>
      h(
        <SvgIcon>
          <polyline points='22 12 16 12 14 15 10 15 8 12 2 12' />
          <path d='M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z' />
        </SvgIcon>
      );
  },
};
export const UpIcon = {
  name: 'UpIcon',
  setup() {
    return () =>
      h(
        <SvgIcon>
          <line x1='12' y1='19' x2='12' y2='5' />
          <polyline points='5 12 12 5 19 12' />
        </SvgIcon>
      );
  },
};
export const UploadIcon = {
  name: 'UploadIcon',
  setup() {
    return () =>
      h(
        <SvgIcon>
          <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
          <polyline points='7 10 12 15 17 10' />
          <line x1='12' y1='15' x2='12' y2='3' />
        </SvgIcon>
      );
  },
};
export const DownloadIcon = {
  name: 'DownloadIcon',
  setup() {
    return () =>
      h(
        <SvgIcon>
          <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
          <polyline points='17 8 12 3 7 8' />
          <line x1='12' y1='3' x2='12' y2='15' />
        </SvgIcon>
      );
  },
};
const SvgIcon = {
  name: 'SvgIcon',
  setup(props, { attrs, slots }) {
    return () => h('svg', { ...attrs, class: 'icon', viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' }, slots);
  },
};
export default SvgIcon;
</script>

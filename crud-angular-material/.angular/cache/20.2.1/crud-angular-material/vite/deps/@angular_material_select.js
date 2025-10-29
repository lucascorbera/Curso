import {
  MAT_SELECT_CONFIG,
  MAT_SELECT_SCROLL_STRATEGY,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
  MAT_SELECT_TRIGGER,
  MatSelect,
  MatSelectChange,
  MatSelectModule,
  MatSelectTrigger
} from "./chunk-4GFLPVEM.js";
import "./chunk-DNJ7TJ6L.js";
import {
  MatOptgroup,
  MatOption
} from "./chunk-TLJU3ZQG.js";
import "./chunk-UL3GMDEJ.js";
import "./chunk-J3HOAHCE.js";
import "./chunk-4JCLJ5PX.js";
import "./chunk-4EGVZUEM.js";
import "./chunk-5TLTUAFA.js";
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix
} from "./chunk-JRGCZIOV.js";
import "./chunk-7SFI7M2P.js";
import "./chunk-AVDOWVDG.js";
import "./chunk-7EFVFBOX.js";
import "./chunk-UGRWDZBU.js";
import "./chunk-OBSMCCGU.js";
import "./chunk-ODV36577.js";
import "./chunk-Z4N25GU6.js";
import "./chunk-UYWIGAIP.js";
import "./chunk-QLNEHLUF.js";
import "./chunk-RQLOT5VV.js";
import "./chunk-MS5DFC6Y.js";
import "./chunk-6ZX4U7PU.js";
import "./chunk-RWMNXUFQ.js";
import "./chunk-4XWRWQHH.js";
import "./chunk-HSFBFVBM.js";
import "./chunk-A6IQLJSD.js";
import "./chunk-PWKYVSAR.js";
import "./chunk-Q6RKMB3F.js";
import "./chunk-YBNECNG7.js";
import "./chunk-WDMUDEB6.js";

// node_modules/@angular/material/fesm2022/select.mjs
var matSelectAnimations = {
  // Represents
  // trigger('transformPanel', [
  //   state(
  //     'void',
  //     style({
  //       opacity: 0,
  //       transform: 'scale(1, 0.8)',
  //     }),
  //   ),
  //   transition(
  //     'void => showing',
  //     animate(
  //       '120ms cubic-bezier(0, 0, 0.2, 1)',
  //       style({
  //         opacity: 1,
  //         transform: 'scale(1, 1)',
  //       }),
  //     ),
  //   ),
  //   transition('* => void', animate('100ms linear', style({opacity: 0}))),
  // ])
  /** This animation transforms the select's overlay panel on and off the page. */
  transformPanel: {
    type: 7,
    name: "transformPanel",
    definitions: [
      {
        type: 0,
        name: "void",
        styles: {
          type: 6,
          styles: { opacity: 0, transform: "scale(1, 0.8)" },
          offset: null
        }
      },
      {
        type: 1,
        expr: "void => showing",
        animation: {
          type: 4,
          styles: {
            type: 6,
            styles: { opacity: 1, transform: "scale(1, 1)" },
            offset: null
          },
          timings: "120ms cubic-bezier(0, 0, 0.2, 1)"
        },
        options: null
      },
      {
        type: 1,
        expr: "* => void",
        animation: {
          type: 4,
          styles: { type: 6, styles: { opacity: 0 }, offset: null },
          timings: "100ms linear"
        },
        options: null
      }
    ],
    options: {}
  }
};
export {
  MAT_SELECT_CONFIG,
  MAT_SELECT_SCROLL_STRATEGY,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
  MAT_SELECT_TRIGGER,
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatOptgroup,
  MatOption,
  MatPrefix,
  MatSelect,
  MatSelectChange,
  MatSelectModule,
  MatSelectTrigger,
  MatSuffix,
  matSelectAnimations
};
//# sourceMappingURL=@angular_material_select.js.map

# Implementation notes by engine

Read only the current engine's section when implementing the selected technique. These are integration checkpoints, not engine ports or a requirement to install tools. Confirm the project's engine/package version, input stack and existing ownership model; the linked documentation was checked on 2026-11-05. Native execution of these engine-specific notes has not been evaluated here.

## Unity

- Inspect `Packages/manifest.json` and the actual input component. With the Input System, align event processing and consumption; capture discrete intent once and consume it in the authorized simulation step. Polling only the latest state can miss intervening transitions. See the [input update-mode guide](https://github.com/Unity-Technologies/InputSystem/blob/develop/Packages/com.unity.inputsystem/Documentation~/timing-select-mode.md).
- For a modal, trace the existing UI input module, selected object and gameplay action maps. Restore a valid selection and prior input ownership on close; hiding a Canvas alone is not proof that gameplay actions stopped.
- Keep cosmetic displacement on the presentation object when physics/aim must stay unchanged. Restore owned offsets rather than overwriting a newer camera or pause state.
- For scheduled audio use the project's supported audio path; [AudioSource.PlayScheduled](https://docs.unity3d.com/ScriptReference/AudioSource.PlayScheduled.html) uses the audio DSP timeline. A successful scheduling call is not a measurement of heard latency. Check cancellation, disabled objects and bus settings.

## Godot

- Inspect `project.godot` input actions and whether code uses `_input`, `_unhandled_input` or polling. [Control input handling](https://docs.godotengine.org/en/stable/classes/class_control.html) explains focus, `accept_event()` and `_gui_input`. Consumed GUI events do not automatically guard unrelated polling; verify that a modal also blocks the game's polling path.
- Restore focus to a surviving control or a documented fallback when the opener disappears. Check controller navigation alongside keyboard input when supported.
- Keep the visual child separate from the body/collision shape for cosmetic offsets. Use the existing physics step for gameplay and explicitly choose the presentation clock for pause behavior.
- [Audio synchronization guidance](https://docs.godotengine.org/en/stable/tutorials/audio/sync_with_audio.html) distinguishes mix timing and output latency. The page flags a version-update caveat; verify APIs against the project's installed version. Avoid lowering buffers blindly: glitches are a different problem from delayed cues.

## Unreal Engine

- With [Enhanced Input](https://dev.epicgames.com/documentation/en-us/unreal-engine/enhanced-input-in-unreal-engine), inspect Input Actions, Mapping Context priorities, modifiers and triggers before adding another filter. Repeated `Triggered` updates are not necessarily separate discrete player presses.
- For UMG/Common UI, inspect the project's actual focus and input-mode owner. Opening/closing a widget must not leave a gameplay binding active underneath or restore a context that another screen owns. Test removal of the opener, not only the normal close path.
- Preserve server-owned collision/results; local particles, camera offsets and audio consume the authoritative event or an explicitly provisional cue. Check duplicate delivery and teardown rather than assuming a cosmetic asset is harmless.
- When sample/beat scheduling is needed, [Quartz](https://dev.epicgames.com/documentation/en-us/unreal-engine/overview-of-quartz-in-unreal-engine) provides an audio scheduling system. Do not add it to ordinary cues without a timing need or claim it removes device latency.

## Web / custom engines

- Timestamp input transitions; distinguish a new press from key repeat. Clear stale intent on blur, modal ownership change and scene exit. Rendering cadence is not a reliable input-buffer or simulation clock.
- Prefer the existing accessible UI stack; a native modal dialog is one possible implementation. Verify focus enters the modal, Tab/Shift+Tab remain inside, Escape follows the intended close behavior, and focus returns to a valid target. [W3C's modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) describes these expectations. Canvas input needs explicit ownership even when the DOM is inert.
- Schedule supported audio against its audio clock rather than frame callbacks; [Web Audio scheduling](https://www.w3.org/TR/webaudio/#dom-audioscheduledsourcenode-start) defines the source start time. Handle suspended contexts, user activation and owner cleanup. Real browser/device checks remain necessary.

For every engine, test the selected boundary, interruption and repeated-event path in its real runtime. The repository's JavaScript fixtures exercise bounded contracts; passing them does not certify Unity, Godot or Unreal integration.

<div>
	<div name="preview">

	</div>
	<div name="resolution">
		<component type="CheckboxList" name="resolution-list" radio >
			<component type="Checkbox" name="r800" text="800x600" />
			<component type="Checkbox" name="r640" text="640x480" />
			<component type="Checkbox" name="r320" text="320x240" checked />
		</component>
	</div>
	<component type="RenderTargetStats" name="stats"/>
	<div name="controls" >
		<div class="row first">
			<span>fullscreen:</span>
			<component type="Button" name="fullscreen" text="enable" />
		</div>
		<div class="row last">
			<span>FXAA:</span>
			<component type="Switch" name="FXAA" text="FXAA" />
		</div>
	</div>
</div>
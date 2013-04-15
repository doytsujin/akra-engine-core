#ifndef UIPANEL_TS
#define UIPANEL_TS

#include "IUIPanel.ts"
#include "Component.ts"

module akra.ui {
	export class Panel extends Component implements IUIPanel {
		index: int = -1;
		
		protected $title: JQuery;
		protected $controls: JQuery = null;


		inline get title(): string {
			return this.$title.find("span:first").html();
		}

		inline set title(sTitle: string) {
			this.$title.find("span:first").html(sTitle || "");
			this.titleUpdated(sTitle);
		}

		constructor (parent, options?, eType: EUIComponents = EUIComponents.PANEL) {
			super(parent, mergeOptions({layout: EUILayouts.VERTICAL}, options), eType, 
				$("<div>\
						<div class='panel-title'>\
							<div class=\"controls\">\
								<input type=\"checkbox\" />\
							</div>\
							<span />\
						</div>\
					</div>"));

			this.$title = this.el.find("div.panel-title:first");
			this.$controls = this.el.find("div.controls:first");

			if (isDefAndNotNull(options)) {
				if (isString(options.title)) {
					this.title = options.title;
				}
			}
		}

		_createdFrom($comp: JQuery): void {
			super._createdFrom($comp);
			this.title = $comp.attr('title');
			if (isDef($comp.attr("collapsible"))) {
				this.setCollapsible($comp.attr("collapsible").toLowerCase() !== "false");
			}
		}


		rendered(): void {
			super.rendered();
			this.el.addClass("component-panel");
		}

		inline isCollapsible(): bool {
			return this.el.hasClass("collapsible");
		}

		setCollapsible(bValue: bool = true): void {
			if (bValue === this.isCollapsible()) {
				return;
			}

			this.el.addClass("collapsible");

			var $element = this.layout.el;
			this.$controls.click((e: IUIEvent) => {
				$element.animate({
					height: 'toggle'
				}, 500);
			});
		}

		BROADCAST(titleUpdated, CALL(sTitle));
	}

	register("Panel", Panel);

	export function isPanel(pEntity: IEntity): bool {
		return isComponent(pEntity, EUIComponents.PANEL);
	}
}

#endif

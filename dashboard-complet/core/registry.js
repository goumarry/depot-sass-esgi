export const WidgetRegistry = {
    widgets: {},

    registerWidget(type, renderFunction) {
        this.widgets[type] = renderFunction;
    },

    getWidget(type) {
        if (!this.widgets[type]) {
            console.error(`Widget de type "${type}" non trouvé dans le registre.`);
            return null;
        }
        return this.widgets[type];
    }
};
(function() {
	let appModule = angular.module('ngblog');

	appModule.controller('BlogController', 
		function($scope, ArticleService, ArticleFactory) {
		this.listVisible = false;
		this.formVisible = false;
		this.article = {};
		if (ArticleService.mock) {
			ArticleService.mock(5);
		}
		this.articles = ArticleService.list();
		this.displayArticleForm = (show) => {
			this.listVisible = !show;
			this.formVisible = show;
			if (!show) {
				this.article = {};
			}
		};
		this.editArticle = (article) => {
			this.displayArticleForm(true);
			this.article = ArticleFactory.clone(article);
		};
		this.validateArticleForm = (e) => {
			if (this.article.id) {
				ArticleService.update(this.article);
			} else {
				ArticleService.create(this.article.title,
					this.article.description);
			}
			this.displayArticleForm(false);
		};
		this.deleteArticle = (articleId) => {
			ArticleService.delete(articleId);
		};
		$scope.$on('loggedIn', () => {
			this.listVisible = true;
		});
	});
})();
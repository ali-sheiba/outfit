# frozen_string_literal: true

class ReactResourceGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('templates', __dir__)

  desc 'Generate React Resource Files'
  def create_react_files
    template 'index.jsx', File.join(modules_path, 'index.jsx')
    template 'actions.js', File.join(modules_path, 'actions.js')
    template 'reducer.js', File.join(modules_path, 'reducer.js')
    template 'form.jsx', File.join(modules_path, 'components', 'Form.jsx')
    template 'row.jsx', File.join(modules_path, 'components', 'Row.jsx')
    template 'index_container.jsx', File.join(modules_path, 'containers', 'Index.jsx')
    template 'new_container.jsx', File.join(modules_path, 'containers', 'New.jsx')
  end

  private

  def modules_path
    File.join('app', 'javascript', 'modules', class_name)
  end

  def redux_action
    class_name.singularize.upcase
  end

  def redux_actions
    class_name.pluralize.upcase
  end

  def resource_name
    class_name.singularize
  end

  def resource_names
    class_name.pluralize
  end
end
